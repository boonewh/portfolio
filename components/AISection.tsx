'use client';

import { motion } from 'framer-motion';

const aiSkills = [
  { name: 'Large Language Models', level: 'Advanced', color: '#3b82f6' },
  { name: 'RAG Systems', level: 'Intermediate', color: '#8b5cf6' },
  { name: 'AI Agents', level: 'Advanced', color: '#ec4899' },
  { name: 'Computer Vision', level: 'Intermediate', color: '#10b981' },
  { name: 'Generative UI', level: 'Expert', color: '#06b6d4' },
  { name: 'Prompt Engineering', level: 'Expert', color: '#f59e0b' },
];

export default function AISection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
              Empowering Applications with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Artificial Intelligence</span>
            </h2>
            <p className="text-lg text-gray-400 mb-6">
              Beyond traditional software development, I specialize in integrating cutting-edge AI solutions into practical applications. From building autonomous agents to fine-tuning large language models, I bridge the gap between research and reality.
            </p>
            <p className="text-lg text-gray-400">
              My approach focuses on creating intelligent, adaptive interfaces that evolve with user needs, leveraging the latest in Generative AI and Machine Learning.
            </p>
          </motion.div>

          {/* Interactive Node Visualization */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {aiSkills.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: idx * 0.1,
                    type: "spring",
                    stiffness: 100 
                  }}
                  whileHover={{ scale: 1.05 }}
                  className="relative group bg-gray-900/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 overflow-hidden"
                >
                  <div 
                    className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150" 
                    style={{ backgroundColor: `${skill.color}20` }}
                  />
                  
                  <h3 className="text-white font-semibold relative z-10">{skill.name}</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: skill.color }} />
                    <span className="text-sm text-gray-500">{skill.level}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
