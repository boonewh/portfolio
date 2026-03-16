import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PathSixCRM from '@/components/PathSixCRM';
import AIBuilds from '@/components/AIBuilds';
import WebWork from '@/components/WebWork';
import Contact from '@/components/Contact';
import GlowScroll from '@/components/GlowScroll';

export default function Home() {
  return (
    <div className="bg-white dark:bg-[#050505] min-h-screen relative selection:bg-cyan-500/30 overflow-x-hidden">
      <GlowScroll />
      <Header />
      <main className="flex flex-col relative z-0">
        <Hero />
        <PathSixCRM />
        <AIBuilds />
        <WebWork />
        <Contact />
      </main>
      <footer className="py-12 text-center text-gray-600 dark:text-gray-400 text-sm relative z-10 border-t border-gray-200 dark:border-gray-900">
        <p>© {new Date().getFullYear()} Will Boone. All rights reserved.</p>
      </footer>
    </div>
  );
}