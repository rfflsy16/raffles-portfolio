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
              A highly motivated and detail-oriented software developer with a strong foundation in JavaScript
              acquired through the intensive Full-Stack JavaScript program at Hacktiv8. Passionate about
              building scalable and user-friendly web applications. With an educational background in science
              (MIPA), I possess an analytical mindset that aids in logical problem solving. Dedicated to
              continuous learning and eager to contribute to innovative projects in the technology space.
            </p>
          </motion.div>
        </div>
      </section>
        </>
    )
}