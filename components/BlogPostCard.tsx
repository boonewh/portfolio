'use client';

import Link from 'next/link';
import { PostMeta } from '@/lib/blog';

export default function BlogPostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
      <article
        style={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          paddingTop: '32px',
          paddingBottom: '32px',
          paddingLeft: '0',
          transition: 'padding-left 0.2s ease',
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.paddingLeft = '12px')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.paddingLeft = '0')}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <h2
              style={{
                fontFamily: 'var(--font-alkatra)',
                fontSize: 'clamp(22px, 3vw, 32px)',
                color: '#ffffff',
                marginBottom: '10px',
                lineHeight: 1.2,
              }}
            >
              {post.title}
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-geist-sans)',
                fontSize: '14px',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.4)',
                marginBottom: '14px',
              }}
            >
              {post.excerpt}
            </p>
            {post.tags && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: 'var(--font-geist-mono)',
                      fontSize: '10px',
                      letterSpacing: '0.1em',
                      color: 'rgba(255,255,255,0.25)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '3px',
                      padding: '2px 8px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <time
            dateTime={post.date}
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '11px',
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.25)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </time>
        </div>
      </article>
    </Link>
  );
}
