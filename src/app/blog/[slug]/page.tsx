/**
 * 📝 Blog Post Page
 * Route dinamica: /blog/[slug]
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getBlogPosts, getBlogPost } from '../../../lib/blog';
import BlogPostClient from '../../../components/layout/BlogPostClient';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPost(params.slug);
  if (!post) notFound();

  return <BlogPostClient post={post} />;
}
