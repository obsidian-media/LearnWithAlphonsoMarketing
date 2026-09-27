import type { ReactNode } from "react";

type ArticleLayoutProps = {
  title: string;
  description: string;
  datePublished: string;
  children: ReactNode;
};

function jsonLdScript(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function ArticleLayout({ title, description, datePublished, children }: ArticleLayoutProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    author: { "@type": "Organization", name: "Obsidian Media" },
  };

  return (
    <main className="bg-cream px-6 py-16">
      <article className="mx-auto max-w-2xl">
        <h1 className="font-display text-4xl font-semibold text-ink">{title}</h1>
        <p className="mt-3 text-sm text-ink-soft">{description}</p>
        <div className="prose prose-neutral mt-10 max-w-none text-ink-soft [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink [&_p]:leading-relaxed">
          {children}
        </div>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
    </main>
  );
}
