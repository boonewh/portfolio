import type { Metadata } from 'next';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Will Boone — Software Developer',
  description:
    'Software developer building modern web platforms and AI-driven applications. Specializing in LLM and RAG systems that turn data into useful products.',
  openGraph: {
    url: 'https://www.willboone.dev',
    title: 'Will Boone — Software Developer',
    description:
      'Software developer building modern web platforms and AI-driven applications. Specializing in LLM and RAG systems.',
  },
  alternates: {
    canonical: 'https://www.willboone.dev',
  },
};
import Hero from '@/components/Hero';
import PathSixCRM from '@/components/PathSixCRM';
import AIBuilds from '@/components/AIBuilds';
import OSG from '@/components/OSG';
import WebWork from '@/components/WebWork';
import Contact from '@/components/Contact';
import GlowScroll from '@/components/GlowScroll';

export default function Home() {
  return (
    <div className="bg-[#050505] min-h-screen relative selection:bg-cyan-500/30 overflow-x-hidden">
      <GlowScroll />
      <Header />
      <main className="flex flex-col relative z-0">
        <Hero />
        <PathSixCRM />
        <AIBuilds />
        <OSG />
        <WebWork />
        <Contact />
      </main>
      <footer className="py-12 text-center text-gray-600 dark:text-gray-400 text-sm relative z-10 border-t border-gray-200 dark:border-gray-900">
        <p>© {new Date().getFullYear()} Will Boone. All rights reserved.</p>
      </footer>
    </div>
  );
}