interface CategoriesProps {
  categories: string[];
}

export default function Categories({ categories }: CategoriesProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="catlinks">
      <span className="catlinks__title">Kategori:</span>
      <ul className="catlinks__list">
        {categories.map((cat, i) => (
          <li key={i}>
            <a href={`/article/${encodeURIComponent(cat)}`}>{cat}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
