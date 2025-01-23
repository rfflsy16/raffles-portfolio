'use client'

import { motion } from 'framer-motion';
import { Button } from '@/components/Button';
import { Mail, Download } from 'lucide-react';
import Link from 'next/link';

export default function ContactSection(){
    return (
        <>
      <section className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center glass-card p-12 rounded-2xl max-w-2xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-8 gradient-text">Get In Touch</h2>
            <p className="text-gray-400 mb-8">
              Interested in working together? Let's connect and create something amazing.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="hover-glow" asChild>
                <Link href="mailto:rfflsy16@gmail.com">
                  <Mail className="mr-2 h-5 w-5" /> Email Me
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="hover-glow">
                <Download className="mr-2 h-5 w-5" /> Download CV
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
        </>
    )
}