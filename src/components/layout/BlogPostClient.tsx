/**
 * 📝 BlogPostClient Component
 * Client wrapper per il contenuto MDX del post
 */
'use client';

import Link from 'next/link';
import { ArrowLeft } from 'react-bootstrap-icons';
import BlogLayout from './BlogLayout';
import type { BlogPostFull } from '../../lib/blog';
import './BlogLayout.css';

interface Props {
  post: BlogPostFull;
}

export default function BlogPostClient({ post }: Props) {
  const { frontmatter, content } = post;

  return (
    <BlogLayout>
      <article className="blog-article">
        <div className="blog-article__back">
          <Link href="/blog" className="blog-back-link">
            <ArrowLeft size={16} /> Tutti gli articoli
          </Link>
        </div>
        <header className="blog-article__header">
          <div className="blog-article__tags">
            {frontmatter.tags.map((tag) => (
              <span key={tag} className="blog-tag">{tag}</span>
            ))}
          </div>
          <h1 className="blog-article__title">{frontmatter.title}</h1>
          <p className="blog-article__date">{frontmatter.date} • {frontmatter.readingTime} min read</p>
          <p className="blog-article__desc">{frontmatter.description}</p>
        </header>
        <div className="blog-article__body">
          {content}
        </div>
      </article>
    </BlogLayout>
  );
}
