"use client";

import { ReactNode } from "react";

interface SidebarProps {
  children?: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  if (!children) return null;

  return (
    <aside className="vector-toc">
      <div className="vector-toc__inner">
        {children}
      </div>
    </aside>
  );
}
