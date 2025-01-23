'use client';

import { motion } from "framer-motion";
import { education } from "@/constants";
import { Card } from "@/components/Card";
import Image from "next/image";

export default function EducationSection() {
    return (
        <>
      <section className="section-padding">
        <div className="container">
          <h2 className="text-4xl font-bold mb-16 gradient-text text-center">Education</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <motion.div
                key={edu.school}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="overflow-hidden glass-card card-hover">
                  <div className="relative h-64 w-full">
                    <Image
                      src={edu.image}
                      alt={edu.school}
                      fill
                      className="object-cover"
                      unoptimized={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-2">{edu.school}</h3>
                    <p className="text-gray-400">{edu.program}</p>
                    <p className="text-sm text-gray-500 mt-4">{edu.period}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
        </>
    )
}