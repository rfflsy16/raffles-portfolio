'use client'

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { Sparkles, Send } from 'lucide-react';
import { aiQuestions } from '@/constants';
import { prompts } from '@/constants/prompts';
import AI, { Message } from '@/lib/ai';

interface AiChatsProps {
    isOpen: boolean;
    onClose: () => void;
}

interface ChatMessage {
    role: 'user' | 'ai';
    content: string;
    isTyping?: boolean;
}

export default function AiChats({ isOpen, onClose }: AiChatsProps) {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    };

    // Scroll when chat history changes or during typing animation
    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || isLoading) return;
    
        const userMessage = message;
        setMessage('');
        
        // Add user message and initial AI loading message
        setChatHistory(prev => [
            ...prev, 
            { role: 'user', content: userMessage },
            { role: 'ai', content: '', isTyping: true }
        ]);
        
        setIsLoading(true);
        
        try {
            // Format messages for the AI API
            const apiMessages: Message[] = [
                { role: 'system', content: prompts },
                ...chatHistory.map(msg => ({
                    role: msg.role === 'user' ? 'user' as const : 'assistant' as const,
                    content: msg.content
                })),
                { role: 'user', content: userMessage }
            ];
            
            // Call the AI service
            const aiResponse = await AI(apiMessages);
            
            // Remove the loading message
            setChatHistory(prev => {
                const newHistory = [...prev];
                newHistory.pop();
                return newHistory;
            });
            
            // Animate the response character by character
            let displayedResponse = '';
            setChatHistory(prev => [...prev, { role: 'ai', content: '', isTyping: true }]);
            
            const chunkSize = 1;
            for (let i = 0; i < aiResponse.length; i += chunkSize) {
                const chunk = aiResponse.substring(i, i + chunkSize);
                displayedResponse += chunk;
                
                setChatHistory(prev => {
                    const newHistory = [...prev];
                    newHistory[newHistory.length - 1] = {
                        role: 'ai',
                        content: displayedResponse,
                        isTyping: i + chunkSize < aiResponse.length
                    };
                    return newHistory;
                });
                
                // Force immediate scroll
                setTimeout(scrollToBottom, 0);
                
                // Add a small delay between characters
                await new Promise(resolve => setTimeout(resolve, 10));
            }
        } catch (error) {
            console.error('Error getting AI response:', error);
            
            // Replace the loading message with an error message
            setChatHistory(prev => {
                const newHistory = [...prev];
                if (newHistory[newHistory.length - 1].isTyping) {
                    newHistory[newHistory.length - 1] = {
                        role: 'ai',
                        content: "I'm sorry, I couldn't process your request. Please try again.",
                        isTyping: false
                    };
                }
                return newHistory;
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Render helper functions
    const renderWelcomeMessage = () => (
        <motion.div 
            className="text-center space-y-6 py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="space-y-6">
                <motion.h3 
                    className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
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
                    Hi! I&apos;m here to help you learn more about Raffles. Feel free to ask me anything about his skills, experience, or projects!
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
                                className="glass-card p-3 rounded-xl text-sm text-gray-400 cursor-pointer hover:bg-primary/10 hover:text-primary transition-all duration-300"
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
    );

    const renderChatMessage = (chat: ChatMessage, index: number) => (
        <motion.div
            key={index}
            initial={{ opacity: 0, x: chat.role === 'user' ? 50 : -50, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 20,
                mass: 0.8,
                delay: 0.1
            }}
            className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`max-w-[80%] p-4 rounded-2xl ${
                    chat.role === 'user'
                        ? 'bg-gradient-to-r from-primary/30 to-secondary/30 text-white border border-primary/30 rounded-br-sm'
                        : 'glass-card text-gray-200 border border-white/20 rounded-bl-sm px-5 py-4'  // Added more padding
                    }`}
            >
                {chat.isTyping && chat.content === '' ? (
                    <div className="typing-animation flex justify-center items-center h-6">
                        <span className="w-2 h-2 bg-primary rounded-full mx-1"></span>
                        <span className="w-2 h-2 bg-primary rounded-full mx-1"></span>
                        <span className="w-2 h-2 bg-primary rounded-full mx-1"></span>
                    </div>
                ) : (
                    <div className={`${chat.role === 'ai' ? 'ai-message-content prose prose-invert max-w-none' : ''}`}>
                        {chat.role === 'ai' ? (
                            <div 
                                className="ai-response-content"
                                dangerouslySetInnerHTML={{ 
                                    __html: chat.content
                                        .replace(/\n\n/g, '</p><p class="my-4">')  // Add margin to paragraphs
                                        .replace(/\n/g, '<br>')
                                        .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 bg-blue-500/20 rounded text-sm">$1</code>')
                                        .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-blue-300">$1</strong>')  // Highlight strong text
                                        .replace(/\*([^*]+)\*/g, '<em class="text-gray-300">$1</em>')  // Style emphasis
                                        .replace(/^(#{1,6})\s+(.+)$/gm, (_, h, text) => {
                                            const level = h.length;
                                            return `<h${level} class="text-blue-300 font-semibold my-4">${text}</h${level}>`;  // Increase margin for headings
                                        })
                                        // Add proper list formatting
                                        .replace(/^\s*[-*]\s+(.+)$/gm, '<li class="ml-4 my-1">$1</li>')
                                        .replace(/(<li[^>]*>.*<\/li>)\s*(<li[^>]*>)/g, '$1$2')
                                        .replace(/(<li[^>]*>.*<\/li>)(?!\s*<li)/g, '<ul class="my-3 space-y-2">$1</ul>')
                                }} 
                            />
                        ) : (
                            chat.content
                        )}
                    </div>
                )}
            </motion.div>
        </motion.div>
    );

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
                                className="flex justify-between items-center p-6 border-b border-white/10 bg-gradient-to-r from-primary/5 to-secondary/5"
                                initial={false}
                                animate={{
                                    background: ['linear-gradient(90deg, rgba(56, 224, 231, 0.05) 0%, rgba(72, 226, 172, 0.05) 50%, rgba(56, 224, 231, 0.05) 100%)'],
                                }}
                                transition={{
                                    background: { duration: 3, repeat: Infinity },
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <motion.div 
                                        className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center"
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
                                    ref={chatContainerRef}
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
                                        
                                        @keyframes blink {
                                            0% { opacity: 0.2; }
                                            20% { opacity: 1; }
                                            100% { opacity: 0.2; }
                                        }
                                        
                                        .typing-animation span {
                                            animation: blink 1.4s infinite both;
                                        }
                                        
                                        .typing-animation span:nth-child(2) {
                                            animation-delay: 0.2s;
                                        }
                                        
                                        .typing-animation span:nth-child(3) {
                                            animation-delay: 0.4s;
                                        }
                                        
                                        /* Enhanced AI message styling */
                                        .ai-response-content {
                                            line-height: 1.6;
                                            letter-spacing: 0.01em;
                                        }
                                        
                                        .ai-response-content p {
                                            margin-bottom: 1rem;
                                        }
                                        
                                        .ai-response-content ul, .ai-response-content ol {
                                            margin-left: 1.5rem;
                                            margin-bottom: 1rem;
                                        }
                                        
                                        .ai-response-content li {
                                            margin-bottom: 0.5rem;
                                        }
                                        
                                        .ai-response-content h1, .ai-response-content h2, .ai-response-content h3,
                                        .ai-response-content h4, .ai-response-content h5, .ai-response-content h6 {
                                            margin-top: 1.5rem;
                                            margin-bottom: 1rem;
                                        }
                                    `}</style>
                                    
                                    {/* Welcome Message or Chat History */}
                                    {chatHistory.length === 0 ? renderWelcomeMessage() : chatHistory.map(renderChatMessage)}

                                    <div ref={messagesEndRef} style={{ height: '1px', marginBottom: '10px' }} />
                                </motion.div>

                                {/* Chat Input */}
                                <motion.div 
                                    className="p-6 border-t border-white/10 bg-gradient-to-r from-primary/5 to-secondary/5"
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
                                                className="w-full p-4 pr-14 rounded-xl glass-card border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-white placeholder:text-gray-400 transition-all duration-300"
                                                disabled={isLoading}
                                            />
                                            <Button
                                                type="submit"
                                                size="icon"
                                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white transition-all duration-300"
                                                disabled={isLoading}
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
