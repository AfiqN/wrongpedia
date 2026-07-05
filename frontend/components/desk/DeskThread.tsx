import ReactMarkdown from "react-markdown";

interface Thread {
  question: string;
  response: string;
  isStreaming: boolean;
  timestamp: string;
}

interface DeskThreadProps {
  thread: Thread;
  index: number;
}

function generateIP(): string {
  const a = 103 + Math.floor(Math.random() * 50);
  const b = Math.floor(Math.random() * 255);
  return `${a}.${b}.xx.xx`;
}

export default function DeskThread({ thread, index }: DeskThreadProps) {
  return (
    <div className="desk-thread">
      {/* Section heading */}
      <div className="desk-thread__heading">
        <h2>{thread.question}</h2>
      </div>

      {/* Question meta */}
      <p className="desk-thread__meta">
        Pertanyaan dari {generateIP()}, {thread.timestamp} (UTC)
      </p>

      <hr className="desk-thread__hr" />

      {/* Response */}
      <div className="desk-thread__response">
        <ReactMarkdown>{thread.response}</ReactMarkdown>
        {thread.isStreaming && <span className="desk-cursor">▌</span>}
      </div>
    </div>
  );
}
