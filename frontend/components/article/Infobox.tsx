interface InfoboxProps {
  title: string;
  imageCaption?: string;
  fields: { label: string; value: string }[];
}

export default function Infobox({ title, imageCaption, fields }: InfoboxProps) {
  if (!title && fields.length === 0) return null;

  return (
    <div className="infobox">
      {/* Title */}
      <div className="infobox__title">{title}</div>

      {/* Placeholder image area */}
      <div className="infobox__image">
        <div style={{
          width: "200px",
          height: "140px",
          margin: "0 auto",
          background: "#c8ccd1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#72777d",
          fontSize: "12px"
        }}>
          [Gambar tidak tersedia]
        </div>
      </div>
      {imageCaption && (
        <div className="infobox__image-caption">{imageCaption}</div>
      )}

      {/* Fields */}
      {fields.map((field, i) => (
        <div className="infobox__row" key={i}>
          <div className="infobox__label">{field.label}</div>
          <div className="infobox__value">{field.value}</div>
        </div>
      ))}
    </div>
  );
}
