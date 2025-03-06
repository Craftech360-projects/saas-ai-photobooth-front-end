
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function LiquidLoading() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-emerald-50 to-teal-50">
      <div className="relative w-64 h-64 mb-8">
        {/* Liquid container */}
        <div className="absolute inset-0 rounded-full overflow-hidden border border-emerald-100 bg-white/50 backdrop-blur-sm shadow-lg">
          {/* Liquid fill */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-teal-400 to-emerald-300"
            style={{
              height: `${progress}%`,
              filter: "url(#liquid-filter)",
            }}
            initial={{ height: "0%" }}
            animate={{ height: `${progress}%` }}
            transition={{ type: "spring", damping: 10 }}
          >
            {/* Bubbles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/30"
                style={{
                  width: Math.random() * 20 + 10,
                  height: Math.random() * 20 + 10,
                  left: `${Math.random() * 80 + 10}%`,
                  bottom: `${Math.random() * 80}%`,
                }}
                initial={{ y: 0, opacity: 0 }}
                animate={{
                  y: -100 - i * 20,
                  opacity: [0, 0.7, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2 + i * 0.5,
                  delay: i * 0.3,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Progress indicator */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white mix-blend-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {progress}%
        </motion.div>

        {/* Ripple effect */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-emerald-200"
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: 1.2, opacity: 0 }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              delay: i * 0.6,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      <motion.div
        className="text-xl font-medium text-emerald-800"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Loading your experience
      </motion.div>

      {/* SVG Filters */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="liquid-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.05" numOctaves="2" seed="1" result="noise">
            <animate attributeName="baseFrequency" from="0.01 0.05" to="0.01 0.08" dur="10s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
    </div>
  )
}

