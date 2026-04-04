import React from 'react'
import { motion } from 'framer-motion'

const messages = [
    "Analyzing your resume...",
    "Matching job requirements...",
    "Generating interview questions...",
    "Building your preparation plan...",
    "Almost there..."
]

const LoadingScreen = () => {
    const [msgIndex, setMsgIndex] = React.useState(0)

    React.useEffect(() => {
        const interval = setInterval(() => {
            setMsgIndex(prev => (prev + 1) % messages.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <motion.main
            className='loading-screen'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className='loading-content'>
                <div className='loading-icon'>
                    <motion.div
                        className='loading-ring'
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <span>🤖</span>
                </div>

                <motion.h2
                    key={msgIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {messages[msgIndex]}
                </motion.h2>

                <div className='loading-dots'>
                    {[0, 1, 2].map(i => (
                        <motion.span
                            key={i}
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                        />
                    ))}
                </div>
            </div>
        </motion.main>
    )
}

export default LoadingScreen