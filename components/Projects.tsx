'use client';

import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Custom CRM Solution',
    description: 'A comprehensive Customer Relationship Management system tailored for business scalability. Features include real-time analytics, automated lead tracking, and seamless third-party integrations.',
    tags: ['Next.js', 'PostgreSQL', 'Tailwind', 'Node.js'],
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'E-Commerce Platform',
    description: 'A modern, high-performance online store built with headless architecture. Includes secure payment processing, inventory management, and a blazing fast user experience.',
    tags: ['React', 'Shopify API', 'Stripe', 'Framer Motion'],
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'SaaS Dashboard',
    description: 'An intuitive dashboard for a SaaS product, providing users with actionable insights and data visualization. Optimized for performance and accessibility.',
    tags: ['Vue.js', 'D3.js', 'Firebase', 'Sass'],
    gradient: 'from-green-500 to-emerald-500',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Projects() {
  return (
    <section className="py-32 px-6 lg:px-8 relative z-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
            Featured Work
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A showcase of technical expertise, from complex backend systems to polished user interfaces.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="group relative rounded-2xl bg-gray-900/50 border border-white/10 p-8 hover:border-white/20 transition-colors overflow-hidden"
            >
              {/* Glow Effect on Hover */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${project.gradient}`}
              />
              
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${project.gradient} mb-6 shadow-lg shadow-${project.gradient.split('-')[1]}-500/20`}>
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                </div>

                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 mb-6 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-gray-300 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
