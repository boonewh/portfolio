import Header from '@/components/Header';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  );
}
