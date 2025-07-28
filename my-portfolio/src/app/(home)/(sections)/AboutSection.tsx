'use client';

import { motion } from 'framer-motion';

export default function AboutSection() {
    return (
        <>
      <section className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto glass-card p-8 rounded-2xl"
          >
            <h2 className="text-3xl font-bold mb-6 gradient-text">About Me</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              I am a passionate and dedicated Fullstack Developer with extensive expertise in modern web and mobile technologies. 
              My journey in software development began with the intensive Full-Stack JavaScript program at Hacktiv8, where I honed 
              my skills in building robust, scalable applications.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mt-4">
              On the frontend, I specialize in React, Next.js, and React Native, creating responsive and intuitive user interfaces 
              that deliver exceptional user experiences. My backend proficiency spans Node.js, Bun, Express, NestJS, and various modern 
              frameworks like Hono and Elysia, complemented by strong database skills in PostgreSQL, MongoDB, and Redis.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mt-4">
              I&apos;m particularly enthusiastic about TypeScript and Go, leveraging type safety and performance to build maintainable, 
              efficient applications. My analytical approach to problem-solving enables me to architect comprehensive solutions 
              that address complex technical challenges while meeting business requirements.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mt-4">
              Continuously exploring emerging technologies and best practices, I&apos;m committed to crafting innovative digital 
              experiences that make a meaningful impact. I thrive in collaborative environments and am always eager to contribute 
              to projects that push the boundaries of what&apos;s possible in web and mobile development.
            </p>
          </motion.div>
        </div>
      </section>
        </>
    )
}