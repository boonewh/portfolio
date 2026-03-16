import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import BlogPostCard from '@/components/BlogPostCard';

export const metadata = {
  title: 'Blog — Will Boone',
  description: 'Thoughts on building with AI, web development, and shipping software.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#050505',
        paddingTop: '120px',
        paddingBottom: '120px',
      }}
    >
      <div
        style={{
          maxWidth: '860px',
          margin: '0 auto',
          paddingLeft: 'clamp(24px, 5vw, 72px)',
          paddingRight: 'clamp(24px, 5vw, 72px)',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '72px' }}>
          <Link
            href="/"
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
              marginBottom: '40px',
            }}
          >
            ← Back
          </Link>
          <p
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '11px',
              letterSpacing: '0.22em',
              color: '#a855f7',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            Writing
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-kaushan-script)',
              fontSize: 'clamp(42px, 6vw, 80px)',
              lineHeight: 1.0,
              color: '#ffffff',
            }}
          >
            The <span style={{ color: '#a855f7' }}>Blog</span>
          </h1>
        </div>

        {/* Post list */}
        {posts.length === 0 ? (
          <p style={{ fontFamily: 'var(--font-geist-sans)', color: 'rgba(255,255,255,0.3)', fontSize: '15px' }}>
            No posts yet.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }} />
          </div>
        )}
      </div>
    </div>
  );
}
