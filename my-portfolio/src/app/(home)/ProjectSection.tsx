'use client';

import { motion } from "framer-motion";
import { ExternalLink, Code, Calendar } from "lucide-react";
import { projects } from "@/constants";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import Image from "next/image";
import { Button } from "@/components/Button";
import Link from "next/link";

export default function ProjectSection() {
    return (
        <section className="section-padding">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold gradient-text">Featured Projects</h2>
                    <p className="text-gray-400 mt-4">Here are some of my projects that I have worked on</p>
                </motion.div>
                
                <div className="relative">
                    {/* Timeline Line with Gradient Animation */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] timeline-gradient" />
                    
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-16 md:mb-24 ${
                                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                            } relative`}
                        >
                            {/* Timeline Node with Pulse Effect */}
                            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-10">
                                <div className="w-6 h-6 bg-blue-500 rounded-full timeline-node">
                                    <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-25"></div>
                                </div>
                            </div>
                            
                            {/* Project Card */}
                            <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                                <Card className="group overflow-hidden modern-card transform hover:-translate-y-1 transition-all duration-300">
                                    {/* Image Container with Hover Effect */}
                                    <div className="relative h-64 md:h-72 w-full overflow-hidden">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                                        
                                        {/* Floating Date Badge */}
                                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                                            <div className="flex items-center gap-2 text-blue-300">
                                                <Calendar className="w-4 h-4" />
                                                <span className="text-sm font-medium">{project.date}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative p-6 md:p-8 bg-gradient-to-b from-gray-900/50 to-gray-900/80">
                                        {/* Content */}
                                        <h3 className="text-2xl font-bold mb-4 gradient-text">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-300 mb-6 line-clamp-3">{project.description}</p>
                                        
                                        {/* Tech Stack */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.tech.map((tech) => (
                                                <Badge 
                                                    key={tech} 
                                                    variant="secondary" 
                                                    className="modern-badge"
                                                >
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <Link href={project.link} className="w-full">
                                                <Button 
                                                    variant="outline"
                                                    className="w-full neo-brutalism-white"
                                                >
                                                    <ExternalLink className="mr-2 h-4 w-4"/> Live Demo
                                                </Button>
                                            </Link>
                                            <Link href={project.code} className="w-full">
                                                <Button 
                                                    variant="outline"
                                                    className="w-full neo-brutalism-white"
                                                >
                                                    <Code className="mr-2 h-4 w-4" /> Source Code
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}