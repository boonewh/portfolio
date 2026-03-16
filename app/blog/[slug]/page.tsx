import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts, getPostBySlug } from '@/lib/blog';

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const { meta } = getPostBySlug(slug);
    const url = `https://www.willboone.dev/blog/${slug}`;
    return {
      title: meta.title,
      description: meta.excerpt,
      openGraph: {
        type: 'article',
        url,
        title: meta.title,
        description: meta.excerpt,
        publishedTime: meta.date,
        authors: ['Will Boone'],
        tags: meta.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: meta.title,
        description: meta.excerpt,
      },
      alternates: {
        canonical: url,
      },
    };
  } catch {
    return {};
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    var { meta, content } = getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#050505',
        paddingTop: '120px',
        paddingBottom: '140px',
      }}
    >
      <div
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          paddingLeft: 'clamp(24px, 5vw, 72px)',
          paddingRight: 'clamp(24px, 5vw, 72px)',
        }}
      >
        {/* Back link */}
        <Link
          href="/blog"
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '11px',
            letterSpacing: '0.18em',
            color: 'rgba(255,255,255,0.3)',
            textTransform: 'uppercase',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '48px',
          }}
        >
          ← All posts
        </Link>

        {/* Post header */}
        <header style={{ marginBottom: '56px' }}>
          {meta.tags && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {meta.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: '10px',
                    letterSpacing: '0.1em',
                    color: '#a855f7',
                    border: '1px solid rgba(168,85,247,0.25)',
                    borderRadius: '3px',
                    padding: '2px 8px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1
            style={{
              fontFamily: 'var(--font-alkatra)',
              fontSize: 'clamp(36px, 5vw, 64px)',
              lineHeight: 1.1,
              color: '#ffffff',
              marginBottom: '20px',
            }}
          >
            {meta.title}
          </h1>
          <time
            dateTime={meta.date}
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '11px',
              letterSpacing: '0.14em',
              color: 'rgba(255,255,255,0.25)',
            }}
          >
            {new Date(meta.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
        </header>

        {/* MDX content */}
        <div className="prose-blog">
          <MDXRemote source={content} />
        </div>
      </div>
    </div>
  );
}
