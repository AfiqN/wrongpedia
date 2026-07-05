import Infobox from "./Infobox";
import References from "./References";
import Categories from "./Categories";

export interface ArticleSection {
  id: string;
  title: string;
  level: number;
  content: string;
}

export interface ArticleData {
  title: string;
  hatnote?: string;
  lead: string;
  infobox: {
    title: string;
    image_caption?: string;
    fields: { label: string; value: string }[];
  };
  sections: ArticleSection[];
  references: { id: number; text: string }[];
  categories: string[];
}

interface ArticleContentProps {
  article: ArticleData;
}

export default function ArticleContent({ article }: ArticleContentProps) {
  return (
    <div className="mw-parser-output clearfix">
      {/* Hatnote */}
      {article.hatnote && (
        <div className="hatnote">{article.hatnote}</div>
      )}

      {/* Infobox */}
      <Infobox
        title={article.infobox.title}
        imageCaption={article.infobox.image_caption}
        fields={article.infobox.fields}
      />

      {/* Lead paragraph */}
      <p dangerouslySetInnerHTML={{ __html: article.lead }} />

      {/* Sections */}
      {article.sections.map((section) => (
        <div key={section.id}>
          <div
            className={section.level === 2 ? "mw-heading2" : "mw-heading3"}
            id={section.id}
          >
            {section.level === 2 ? (
              <h2>{section.title}</h2>
            ) : (
              <h3>{section.title}</h3>
            )}
          </div>
          <p dangerouslySetInnerHTML={{ __html: section.content }} />
        </div>
      ))}

      {/* References */}
      <References references={article.references} />

      {/* Categories */}
      <Categories categories={article.categories} />
    </div>
  );
}
