'use client';
import { Button } from '@/components/Button';
import { Github, Linkedin, Mail, MapPin, MessageSquareMore } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import AiChats from '@/components/AiChats';
import { KeyboardShortcut } from '@/components/KeyboardShortcut';

export default function HeroSection() {
    const [isAiChatOpen, setIsAiChatOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsAiChatOpen(prev => !prev);
            }

            // Also handle Escape key to close the chat
            if (e.key === 'Escape' && isAiChatOpen) {
                setIsAiChatOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isAiChatOpen]);

    return (
        <>
            <section className="min-h-screen flex items-center justify-center section-padding">
                <div className="text-center max-w-4xl mx-auto px-4">
                    <div className="relative w-48 h-48 mx-auto mb-8 group cursor-pointer" onClick={() => setIsAiChatOpen(true)}>
                        {/* Chat Icon */}
                        <motion.div
                            className="absolute -right-4 -top-4 will-change-transform"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ 
                                opacity: 1,
                                scale: [0, 1.2, 1],
                                rotate: [0, -10, 10, -10, 0]
                            }}
                            transition={{
                                duration: 0.5,
                                rotate: {
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut",
                                    delay: 0.5
                                }
                            }}
                        >
                            <MessageSquareMore className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />
                        </motion.div>

                        {/* Profile Picture */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50 blur-2xl opacity-75 group-hover:opacity-90" />
                        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10 group-hover:border-primary/30">
                            <Image
                                src="/raffles-photo.webp"
                                alt="Profile Photo"
                                fill
                                sizes="(max-width: 768px) 192px, 192px"
                                quality={75}
                                priority
                                className="object-cover transform group-hover:scale-105 will-change-transform"
                            />
                        </div>
                    </div>

                    <div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
                            Raffles Yohanes
                        </h1>
                        <h2 className="text-2xl md:text-3xl text-blue-400/80 mb-8">Fullstack Developer</h2>
                        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                            Crafting exceptional digital experiences with modern web technologies
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <Button size="lg" variant="outline" className="hover-glow" asChild>
                            <Link href="https://www.linkedin.com/in/rafles-yohanes-2a66b0329/" target="_blank" rel="noopener noreferrer">
                                <Linkedin className="mr-2 h-5 w-5" /> LinkedIn
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="hover-glow" asChild>
                            <Link href="https://github.com/rfflsy16" target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-5 w-5" /> GitHub
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="hover-glow" asChild>
                            <Link href="mailto:rfflsy16@gmail.com">
                                <Mail className="mr-2 h-5 w-5" /> rfflsy16@gmail.com
                            </Link>
                        </Button>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-gray-400">
                        <MapPin className="h-5 w-5" />
                        <span>Jakarta, Indonesia</span>
                    </div>
                </div>
            </section>
            
            <AiChats isOpen={isAiChatOpen} onClose={() => setIsAiChatOpen(false)} />
            <KeyboardShortcut />
        </>
    );
}