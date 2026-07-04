"""RAG orchestrator for WrongPedia — retrieves wrong facts and generates confident wrong answers."""

import logging
from typing import Optional, List, Any

import chromadb
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage, BaseMessage

from app.config import settings
from app.core.llm_interface import invoke_llm_langchain
from app.core.vector_store_manager import embed_texts
from app.schemas import ChatMessage

logger = logging.getLogger(__name__)


# --- The Wrong Professor System Prompt ---

WRONG_PROFESSOR_PROMPT = """Kamu adalah Profesor dari WrongPedia — ensiklopedia alternatif yang SELALU benar (menurut dirimu sendiri).

ATURAN MUTLAK:
1. Kamu HANYA tahu informasi yang ada di "Referensi WrongPedia" di bawah ini.
2. Informasi di referensi adalah KEBENARAN ABSOLUT. Tidak ada yang salah. Semuanya fakta.
3. JANGAN PERNAH bilang "maaf saya salah", "sebenarnya", atau mengakui kesalahan APAPUN.
4. Jika user membantah atau mengoreksi, kamu TETAP YAKIN. Berikan "bukti" tambahan dari referensimu. Bersikaplah sedikit condescending, seolah user-lah yang salah.
5. Jika ditanya hal di LUAR referensimu, bilang: "Topik tersebut masih dalam proses riset tim editorial WrongPedia. Saya belum bisa memberikan informasi yang belum terverifikasi."
6. Gaya bicara: FORMAL, SOPAN, PERCAYA DIRI, sedikit sombong — seperti profesor senior yang diragukan mahasiswanya.
7. Gunakan bahasa yang sama dengan user (Indonesia/English).
8. Jawab dengan detail dan elaborasi — jangan singkat. Kembangkan "fakta" dari referensi menjadi penjelasan yang panjang dan meyakinkan.
9. Sesekali tambahkan "menurut riset terbaru dari WrongPedia" atau "sebagaimana tercatat dalam arsip kami" untuk menambah kesan otoritatif.
10. JANGAN PERNAH menyebut kata "WrongPedia" sebagai sesuatu yang salah. Itu nama institusimu yang terhormat.

---
Referensi WrongPedia:
{context}
---
"""


def get_chat_response(
    question: str,
    collection_name: str,
    embedding_model: Any,
    vector_store_path: str,
    chat_history: Optional[List[ChatMessage]] = None,
) -> Optional[str]:
    """Generate a confidently wrong answer based on universe facts.

    Args:
        question: User's question.
        collection_name: ChromaDB collection for this universe.
        embedding_model: Loaded SentenceTransformer model.
        vector_store_path: Path to ChromaDB persistence directory.
        chat_history: Previous messages for context.

    Returns:
        The wrong professor's answer, or None on error.
    """
    logger.info(f"Chat request in universe '{collection_name}': '{question}'")

    if not settings.GOOGLE_API_KEY:
        logger.error("GOOGLE_API_KEY not configured.")
        return None

    # --- 1. Retrieve relevant wrong facts ---
    try:
        client = chromadb.PersistentClient(path=vector_store_path)
        collection = client.get_collection(name=collection_name)

        # Embed the question
        query_embedding = embed_texts([question], embedding_model)
        if not query_embedding:
            logger.error("Failed to embed query.")
            return None

        # Query for relevant facts
        results = collection.query(
            query_embeddings=query_embedding,
            n_results=settings.RAG_NUM_RESULTS,
        )

        # Format context
        if results and results.get("documents") and results["documents"][0]:
            context = "\n\n".join(results["documents"][0])
        else:
            context = "Tidak ada referensi spesifik yang ditemukan untuk pertanyaan ini."

        logger.info(f"Retrieved {len(results['documents'][0]) if results.get('documents') else 0} facts as context.")

    except Exception as e:
        logger.error(f"Error querying vector store: {e}", exc_info=True)
        return None

    # --- 2. Build message list ---
    messages: List[BaseMessage] = []

    # System prompt with wrong facts as context
    system_content = WRONG_PROFESSOR_PROMPT.format(context=context)
    messages.append(SystemMessage(content=system_content))

    # Chat history
    if chat_history:
        for msg in chat_history:
            if msg.role.lower() == "user":
                messages.append(HumanMessage(content=msg.content))
            elif msg.role.lower() == "assistant":
                messages.append(AIMessage(content=msg.content))

    # Current question
    messages.append(HumanMessage(content=question))

    # --- 3. Call LLM ---
    try:
        answer = invoke_llm_langchain(
            prompt_input=messages,
            model_name=settings.LLM_MODEL_NAME,
            temperature=settings.LLM_TEMPERATURE,
        )

        if answer is None:
            logger.error("LLM returned None.")
            return None

        logger.info(f"Generated wrong answer (length: {len(answer)})")
        return answer

    except Exception as e:
        logger.error(f"Error calling LLM: {e}", exc_info=True)
        return None
