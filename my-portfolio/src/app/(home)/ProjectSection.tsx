'use client';

import { motion } from "framer-motion";
import { ExternalLink, Code } from "lucide-react";
import { projects } from "@/constants";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import Image from "next/image";
import {Button} from "@/components/Button";
import Link from "next/link";

export default function ProjectSection() {
    return (
        <>
      <section className="section-padding">
        <div className="container">
          <h2 className="text-4xl font-bold mb-16 gradient-text text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden glass-card card-hover">
                  <div className="relative h-64 w-full">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    <p className="text-gray-400 mb-6">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="secondary" className="bg-blue-500/10 text-blue-400">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-4">
											<Link  href={project.link}>
                      <Button size="sm" variant="outline" className="hover-glow">
                        <ExternalLink className="mr-2 h-4 w-4"/> Live Demo
                      </Button>
											</Link>
											<Link href={project.code}>
                      <Button size="sm" variant="outline" className="hover-glow">
                        <Code className="mr-2 h-4 w-4" /> Source Code
                      </Button>
											</Link>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">{project.date}</p>
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