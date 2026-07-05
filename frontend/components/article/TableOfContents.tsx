"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <nav className="vector-toc__nav">
      <div className="vector-toc__heading">
        <span className="vector-toc__heading-text">Daftar isi</span>
        <span className="vector-toc__toggle">▾</span>
      </div>
      <ul className="vector-toc__list">
        {items.map((item) => (
          <li key={item.id} className="vector-toc__item">
            <a
              href={`#${item.id}`}
              className={`vector-toc__link${item.level === 3 ? " vector-toc__link--level-2" : ""}${activeId === item.id ? " vector-toc__link--active" : ""}`}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
