/**
 * 📝 Blog Index Page
 * Lista articoli DevLog
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { getBlogPosts } from '../../lib/blog';
import BlogLayout from '../../components/layout/BlogLayout';

export const metadata: Metadata = {
  title: 'DevLog | Blog',
  description: 'Articoli tecnici su React, TypeScript, Next.js e Web Development.',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <BlogLayout>
      <div className="blog-index">
        <h1 className="blog-index__title">📝 DevLog</h1>
        <p className="blog-index__sub">Note tecniche, esperienze e riflessioni sul Web Development.</p>
        <ul className="blog-list">
          {posts.map((post) => (
            <li key={post.slug} className="blog-list__item">
              <Link href={`/blog/${post.slug}`} className="blog-list__link">
                <span className="blog-list__date">{post.date} • {post.readingTime} min read</span>
                <h2 className="blog-list__title">{post.title}</h2>
                <p className="blog-list__desc">{post.description}</p>
                <div className="blog-list__tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="blog-tag">{tag}</span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </BlogLayout>
  );
}
