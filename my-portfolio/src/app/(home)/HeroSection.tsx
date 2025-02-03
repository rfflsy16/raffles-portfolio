'use client';
import { Button } from '@/components/Button';
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

export default function HeroSection() {
    const controls = useAnimation();

    useEffect(() => {
        controls.start({ opacity: 1, y: 0 });
    }, [controls]);

    return (
        <section className="min-h-screen flex items-center justify-center section-padding">
          <div className="text-center max-w-4xl mx-auto px-4">
            {/* Critical content rendered first */}
            <div className="relative w-48 h-48 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-50 blur-xl" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
                <Image
                  src="/raffles-photo.webp"
                  alt="Profile Photo"
                  fill
                  sizes="192px"
                  priority
                  className="object-cover rounded-xl"
                />
              </div>
            </div>

            <div className="mb-10">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
                Raffles Yohanes
              </h1>
              <h2 className="text-2xl md:text-3xl text-blue-400/80 mb-8">Fullstack Developer</h2>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                Crafting exceptional digital experiences with modern web technologies
              </p>
            </div>

            {/* Non-critical content with deferred animations */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={controls}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
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
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={controls}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="flex items-center justify-center gap-2 text-gray-400"
            >
              <MapPin className="h-5 w-5" />
              <span>Jakarta, Indonesia</span>
            </motion.div>
          </div>
        </section>
    )
}