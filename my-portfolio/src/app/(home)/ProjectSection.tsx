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
                                <Card className="overflow-hidden glass-card card-hover">
                                    {/* Image Container with Hover Effect */}
                                    <div className="relative h-64 md:h-72 w-full">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        
                                        {/* Floating Date Badge */}
                                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
                                            <div className="flex items-center gap-2 text-blue-300">
                                                <Calendar className="w-4 h-4" />
                                                <span className="text-sm font-medium">{project.date}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8">
                                        {/* Content */}
                                        <h3 className="text-2xl font-bold mb-4 gradient-text">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-300 mb-6">{project.description}</p>
                                        
                                        {/* Tech Stack */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.tech.map((tech) => (
                                                <Badge 
                                                    key={tech} 
                                                    variant="secondary" 
                                                    className="backdrop-blur-sm bg-black-500/20 border border-blue-400/50 text-white rounded-md"
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
                                                    className="w-full backdrop-blur-sm bg-primary/20 border-primary/40 hover:bg-primary/30 text-white font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-primary/30 hover:shadow-lg"
                                                >
                                                    <ExternalLink className="mr-2 h-4 w-4"/> Live Demo
                                                </Button>
                                            </Link>
                                            <Link href={project.code} className="w-full">
                                                <Button 
                                                    variant="outline"
                                                    className="w-full backdrop-blur-sm bg-secondary/20 border-secondary/40 hover:bg-secondary/30 text-white font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-secondary/30 hover:shadow-lg"
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