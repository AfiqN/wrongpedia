interface ReferencesProps {
  references: { id: number; text: string }[];
}

export default function References({ references }: ReferencesProps) {
  if (!references || references.length === 0) return null;

  return (
    <div>
      <div className="mw-heading2" id="referensi">
        <h2>Referensi</h2>
      </div>
      <ol className="reflist">
        {references.map((ref) => (
          <li key={ref.id} id={`cite_note-${ref.id}`}>
            <span className="reflist__backlink">↑</span>
            <span className="reference-text">{ref.text}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
