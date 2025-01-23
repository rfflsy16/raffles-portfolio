'use client';

import { motion } from "framer-motion";
import { certifications } from "@/constants";
import { Card } from "@/components/Card";
import Image from "next/image";
import {  Terminal } from "lucide-react";
import Link from "next/link";

export default function CertificationSection() {
    return (
        <>
      <section className="section-padding">
        <div className="container">
          <h2 className="text-4xl font-bold mb-16 gradient-text text-center">Certifications</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="overflow-hidden glass-card card-hover">
                  <div className="relative h-64 w-full">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-8">
                    <h2 className="text-2xl font-bold mb-3">{cert.title}</h2>
                    {cert.items && (
											<ul className="text-gray-400 space-y-2 mt-4">
                        {cert.items.map((item) => (
													<li key={item.id} className="flex items-center gap-2">
                            <Terminal className="h-4 w-4 text-blue-400" />
                            <Link
														href={item.link}
														>
															<h1 className="hover-glow rounded-full max-h-screen">{item.title}</h1>
														</Link>
                          </li>
                        ))}
                      </ul>
                    )}
										<br />
										{cert.date && (
											<p className="text-gray-500">{cert.date}</p>
										)}
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