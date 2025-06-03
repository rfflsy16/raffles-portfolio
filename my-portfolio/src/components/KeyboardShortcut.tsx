'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export function KeyboardShortcut() {
    const [isVisible, setIsVisible] = useState(true);
    const [isMac, setIsMac] = useState(false);
    
    useEffect(() => {
        // Detect OS
        setIsMac(navigator.platform.toLowerCase().includes('mac'));
        
        // Hide after 3 seconds
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -20, x: 20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="fixed top-4 right-4 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-md rounded-lg border border-white/10 p-4 text-gray-300 shadow-2xl z-50"
                >
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex items-center gap-2 text-base">
                            <kbd className="px-3 py-1 bg-black/30 rounded-md border border-white/20 font-mono text-sm">
                                {isMac ? '⌘' : 'Ctrl'}
                            </kbd>
                            <span>+</span>
                            <kbd className="px-3 py-1 bg-black/30 rounded-md border border-white/20 font-mono text-sm">
                                K
                            </kbd>
                        </div>
                        <span className="text-sm text-gray-400">to chat with Fles Copilot</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
