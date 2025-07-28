'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import { skills } from "@/constants";

export default function SkillsSection() {
    return (
        <>
      <section className="section-padding">
        <div className="container ">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6 gradient-text">Tech Arsenal</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Armed with a diverse set of modern technologies, I craft exceptional digital experiences.
                Here&apos;s my tech stack that powers innovative solutions:
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="glass-card p-12 rounded-2xl"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 bg-gray-700/15 p-4 rounded-xl">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl hover:bg-white/5 transition-all"
                >
                  <div className="relative w-12 h-12">
                    <Image
                      src={skill.logo}
                      alt={skill.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
        </>
    )
}