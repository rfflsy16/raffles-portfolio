'use client'

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import {  Sparkles, Send } from 'lucide-react';
import { aiQuestions } from '@/constants';

interface AiChatsProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AiChats({ isOpen, onClose }: AiChatsProps) {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai'; content: string }[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setChatHistory(prev => [...prev, { role: 'user', content: message }]);
        
        // Simulate AI response
        setTimeout(() => {
            setChatHistory(prev => [...prev, { 
                role: 'ai', 
                content: 'This is a sample AI response. Replace with actual AI integration.' 
            }]);
        }, 1000);

        setMessage('');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div 
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    
                    <motion.div 
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div 
                            className="w-full max-w-2xl glass-card rounded-2xl shadow-2xl overflow-hidden border border-white/10"
                            initial={{ opacity: 0, y: 100, scale: 0.3, rotate: -10 }}
                            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, y: 100, scale: 0.3, rotate: 10 }}
                            transition={{ 
                                type: 'spring',
                                stiffness: 200,
                                damping: 20,
                                mass: 1
                            }}
                        >
                            {/* Header */}
                            <motion.div 
                                className="flex justify-between items-center p-6 border-b border-white/10 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10"
                                initial={false}
                                animate={{
                                    background: ['linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(59, 130, 246, 0.1) 100%)'],
                                }}
                                transition={{
                                    background: { duration: 3, repeat: Infinity },
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <motion.div 
                                        className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center"
                                        animate={{ 
                                            scale: [1, 1.1, 1],
                                            rotate: 360,
                                        }}
                                        transition={{ 
                                            scale: {
                                                duration: 2,
                                                repeat: Infinity,
                                            },
                                            rotate: {
                                                duration: 20,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }
                                        }}
                                    >
                                        <Sparkles className="w-5 h-5 text-white" />
                                    </motion.div>
                                    <div>
                                        <h2 className="text-xl font-semibold gradient-text">Ask me anything!</h2>
                                        <p className="text-sm text-gray-400">Powered by advanced AI</p>
                                    </div>
                                </div>
                                <Button
                                    onClick={onClose}
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full hover:bg-white/10"
                                >
                                    <motion.svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                        whileHover={{ rotate: 90 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </motion.svg>
                                </Button>
                            </motion.div>
                            
                            {/* Chat Area */}
                            <div className="flex flex-col h-[500px]">
                                <motion.div 
                                    className="flex-1 overflow-y-auto p-6 space-y-6 
                                    scrollbar-thin scrollbar-track-blue-500/5 
                                    scrollbar-thumb-blue-500/20 hover:scrollbar-thumb-blue-500/30
                                    scrollbar-thumb-rounded-full scrollbar-track-rounded-full
                                    pr-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    style={{
                                        scrollbarWidth: 'thin',
                                        scrollbarColor: 'rgba(59, 130, 246, 0.2) rgba(59, 130, 246, 0.05)',
                                    }}
                                >
                                    <style jsx global>{`
                                        .scrollbar-thin::-webkit-scrollbar {
                                            width: 6px;
                                        }
                                        .scrollbar-thin::-webkit-scrollbar-track {
                                            background: rgba(59, 130, 246, 0.05);
                                            border-radius: 9999px;
                                        }
                                        .scrollbar-thin::-webkit-scrollbar-thumb {
                                            background: rgba(59, 130, 246, 0.2);
                                            border-radius: 9999px;
                                            transition: all 0.3s ease;
                                        }
                                        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
                                            background: rgba(59, 130, 246, 0.3);
                                        }
                                    `}</style>
                                    {/* Welcome Message */}
                                    {chatHistory.length === 0 && (
                                        <motion.div 
                                            className="text-center space-y-6 py-12"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <div className="space-y-6">
                                                <motion.h3 
                                                    className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
                                                    initial={{ scale: 0.9 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    Welcome to My AI Assistant!
                                                </motion.h3>
                                                <motion.p 
                                                    className="text-base text-gray-400 max-w-md mx-auto mb-8"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.2 }}
                                                >
                                                    Hi! I'm here to help you learn more about Raffles. Feel free to ask me anything about his skills, experience, or projects!
                                                </motion.p>
                                                <motion.div
                                                    className="space-y-3"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.4 }}
                                                >
                                                    <p className="text-sm text-gray-500 mb-4">Try asking:</p>
                                                    <div className="flex flex-col gap-3">
                                                        {aiQuestions.map((question, index) => (
                                                            <motion.div
                                                                key={index}
                                                                className="glass-card p-3 rounded-xl text-sm text-gray-400 cursor-pointer hover:bg-blue-500/10 hover:text-blue-400 transition-all duration-300"
                                                                whileHover={{ scale: 1.02, x: 5 }}
                                                                onClick={() => {
                                                                    setMessage(question);
                                                                    const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                                                                    if (input) input.focus();
                                                                }}
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: 0.2 + index * 0.1 }}
                                                            >
                                                                {question}
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    )}
                                    
                                    {/* Chat Messages */}
                                    {chatHistory.map((chat, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: chat.role === 'user' ? 50 : -50, y: 20 }}
                                            animate={{ opacity: 1, x: 0, y: 0 }}
                                            transition={{ 
                                                type: "spring",
                                                stiffness: 200,
                                                damping: 20,
                                                mass: 0.8,
                                                delay: index * 0.1 
                                            }}
                                            className={`flex ${
                                                chat.role === 'user' ? 'justify-end' : 'justify-start'
                                            }`}
                                        >
                                            <motion.div
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className={`max-w-[80%] p-4 rounded-2xl ${
                                                    chat.role === 'user'
                                                        ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-blue-200 border border-blue-500/30 rounded-br-sm'
                                                        : 'glass-card text-gray-200 border border-white/20 rounded-bl-sm'
                                                }`}
                                            >
                                                {chat.content}
                                            </motion.div>
                                        </motion.div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </motion.div>

                                {/* Chat Input */}
                                <motion.div 
                                    className="p-6 border-t border-white/10 bg-gradient-to-r from-blue-500/5 to-purple-500/5"
                                    initial={false}
                                    whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                                >
                                    <form onSubmit={handleSubmit}>
                                        <motion.div
                                            initial={false}
                                            whileHover={{ scale: 1.02 }}
                                            className="relative"
                                        >
                                            <input
                                                type="text"
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                placeholder="Ask me anything"
                                                className="w-full p-4 pr-14 rounded-xl glass-card border border-white/10 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-white placeholder:text-gray-400 transition-all duration-300"
                                            />
                                            <Button
                                                type="submit"
                                                size="icon"
                                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white transition-all duration-300"
                                            >
                                                <motion.div
                                                    whileHover={{ scale: 1.1, rotate: 15 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <Send className="w-5 h-5" />
                                                </motion.div>
                                            </Button>
                                        </motion.div>
                                    </form>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}