"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Code, MessageSquare, Bug, PenTool, Settings } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

export default function About() {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const features = [
    { title: "Bug Fixing", icon: <Bug className="w-6 h-6" />, description: "Easily identify and resolve issues in your code. Submit your code, and Code Assist will help detect and suggest fixes for bugs, allowing for a smoother coding experience." },
    { title: "Code Refactoring", icon: <Code className="w-6 h-6" />, description: "Get your code optimized for better readability and performance. Code Assist refactors your code, restructuring it while preserving its functionality, so it's cleaner and easier to maintain." },
    { title: "Code Formatting", icon: <PenTool className="w-6 h-6" />, description: "We offer automatic code formatting to ensure your code follows industry-standard ESLint rules. Whether it's for a personal project or preparing for a team collaboration, Code Assist makes sure your code is neat and consistent." },
    { title: "Adding Comments", icon: <MessageSquare className="w-6 h-6" />, description: "Understanding code is key to effective coding. Code Assist can automatically add clear, helpful comments to your code, improving documentation and making it easier for teams to collaborate." },
    { title: "Custom Instructions", icon: <Settings className="w-6 h-6" />, description: "Have specific needs? Code Assist allows you to provide custom instructions along with your code. Whether you're looking for a particular coding style or a unique approach to solve a problem, our AI will tailor the output according to your instructions." },
  ]

  useEffect(() => {
    document.body.style.fontFamily = "'Inter', sans-serif"
    return () => {
      document.body.style.fontFamily = ""
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-gray-300">
      <header className="bg-zinc-900 p-4 flex justify-between items-center border-b border-zinc-700 sticky top-0 z-10">
        <Link to="/main" className="text-xl font-bold flex items-center gap-2 text-white">
        <FontAwesomeIcon icon={faRobot} />
          Code Assist
        </Link>
        {/* <nav>
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
        </nav> */}
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.section
          style={{ opacity, scale }}
          className="mb-16 relative"
        >
          <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight">About Code Assist</h1>
          <p className="text-xl mb-6 leading-relaxed">
            Code Assist is a specialized platform designed to streamline coding processes and make life easier for coders at every level. Whether you're a beginner writing your first lines of code or a seasoned programmer refining a complex system, Code Assist offers valuable tools to enhance your productivity and code quality.
          </p>
          <p className="text-xl mb-8 leading-relaxed">
            Our mission is to assist coders in their daily tasks by providing AI-driven solutions for common challenges like code refactoring, bug fixing and more. We understand that coding is both an art and a science, and our goal is to help you write cleaner, more efficient, and well-documented code without spending hours on mundane tasks.
          </p>
          <Link to="/main" className="inline-block bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-4 px-8 rounded-full transition-colors text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-opacity-50">
            Try Code Assist
          </Link>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-8">What Does Code Assist Do?</h2>
          <p className="text-xl mb-8 leading-relaxed">
            At Code Assist, we understand the daily challenges coders face. Our platform is tailored to streamline the coding process with the following features:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-zinc-800 p-6 rounded-lg cursor-pointer transition-all duration-300 ease-in-out"
                whileHover={{ scale: 1.05, backgroundColor: "#3b3b3b" }}
                onHoverStart={() => setHoveredFeature(feature.title)}
                onHoverEnd={() => setHoveredFeature(null)}
              >
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h3 className="text-2xl font-semibold ml-3 text-white">{feature.title}</h3>
                </div>
                <p className="text-lg leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="text-4xl font-bold text-white mb-8">Why Choose Code Assist?</h2>
          <p className="text-xl mb-6 leading-relaxed">
            Code Assist is built with coders in mind. It eliminates repetitive tasks, enhances the quality of code, and reduces time spent debugging and refactoring. With an intuitive interface, all you need to do is upload your code, choose the functionality you need, and get the output. It's simple, efficient, and designed to fit seamlessly into your workflow.
          </p>
          <p className="text-xl leading-relaxed">
            Code Assist is here to elevate your coding experience and make coding faster, easier, and more enjoyable.
          </p>
        </motion.section>
      </main>
    </div>
  )
}