import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Code, MessageSquare, Bug, PenTool, Settings, Sun, Moon, Menu } from "lucide-react"
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../../firebase/authContext";
import { signOut } from '../../firebase/auth.js'

export default function About() {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const { theme, toggleTheme } = useTheme();
  const { currentUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-gray-300' : 'bg-white text-gray-600'}`}>
       <header className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-gray-300 border-gray-200'} p-4 flex justify-between items-center border-b sticky top-0 z-10`}>
        <Link to="/main" className={`text-xl font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`}>
         <FontAwesomeIcon icon={faRobot} />
           Code Assist
         </Link>
         <nav className="hidden md:flex gap-6 items-center">
         {!currentUser ? (
            <>
              <Link to="/signIn" className={`${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-900 hover:text-black'} transition-colors`}>Log In</Link>
              <Link to="/signUp" className={`${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-900 hover:text-black'} transition-colors`}>Sign Up</Link>
            </>
          ) : (
            <>
              <button onClick = {async () => {
              await signOut()
            }} className="hover:text-red-500 transition-colors">
              Sign Out
            </button>
            </>
          )}
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </button>
        </nav>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu className="w-6 h-6" />
        </button>
       </header>
       
        {isMenuOpen && (
          <div className={`md:hidden ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'} p-4`}>
            {currentUser ? (
              <>
                <button onClick= {async () => {
                      await signOut()
                    }} className={`block py-2 ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-900 hover:text-black'} transition-colors`}>
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/signIn" className={`block py-2 ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-900 hover:text-black'} transition-colors`}>
                  Log In
                </Link>
                <Link to="/signUp" className={`block py-2 ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-900 hover:text-black'} transition-colors`}>
                  Sign Up
                </Link>
              </>
            )}
    
    <button onClick={toggleTheme} className="w-full text-left py-2">
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  </div>
)}


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.section
          style={{ opacity, scale }}
          className="mb-24 relative text-center"
        >
        <h1 className={`text-4xl md:text-5xl font-extrabold mb-8 leading-tight ${ theme === 'dark' ? 'text-white': 'text-gray-900' }`}>Introducing Code Assist</h1>
          <div className="mb-8">
          <Link 
          to="/main" 
          className={`
            inline-block font-bold py-3 px-6 rounded-full transition-colors text-base 
            shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 
            focus:outline-none focus:ring-2 focus:ring-opacity-50 mb-8
            ${theme === 'dark' 
              ? 'bg-zinc-700 hover:bg-zinc-600 text-white focus:ring-zinc-500' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-400'
            }
          `}
      >
        Try Code Assist &#8599;
      </Link>
          </div>
          <p className={`text-lg md:text-xl leading-relaxed ${theme === 'dark' ? 'text-gray-400': 'text-gray-700'} max-w-3xl mx-auto text-left`}>
            Code Assist is a specialized platform designed to streamline coding processes and make life easier for coders at every level. Whether you're a beginner writing your first lines of code or a seasoned programmer refining a complex system, Code Assist offers valuable tools to enhance your productivity and code quality.
            <br /><br />
            Our mission is to assist coders in their daily tasks by providing AI-driven solutions for common challenges like code refactoring, bug fixing and more. We understand that coding is both an art and a science, and our goal is to help you write cleaner, more efficient, and well-documented code without spending hours on mundane tasks.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-left"
        >
          <h2 className={`text-3xl md:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-8`}>What Does Code Assist Do?</h2>
          <p className={`text-lg md:text-xl mb-8 leading-relaxed ${theme === 'dark' ? 'text-white': 'text-gray-600'} text-left`}>
            At Code Assist, we understand the daily challenges coders face. Our platform is tailored to streamline the coding process with the following features:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`${theme === 'dark' ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-gray-200 hover:bg-gray-300'} p-6 rounded-lg cursor-pointer transition-all duration-300 ease-in-out text-left`}
                whileHover={{scale: 1.03}}
                onHoverStart={() => setHoveredFeature(feature.title)}
                onHoverEnd={() => setHoveredFeature(null)}
              >
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h3 className={`text-xl md:text-2xl font-semibold ml-3 ${theme === 'dark' ? 'text-white': 'text-gray-900'}`}>{feature.title}</h3>
                </div>
                <p className="text-base md:text-lg leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-left"
        >
          <h2 className={`text-3xl md:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-8`}>Why Choose Code Assist?</h2>
          <p className="text-lg md:text-xl mb-6 leading-relaxed text-left">
            Code Assist is built with coders in mind. It eliminates repetitive tasks, enhances the quality of code, and reduces time spent debugging and refactoring. With an intuitive interface, all you need to do is upload your code, choose the functionality you need, and get the output. It's simple, efficient, and designed to fit seamlessly into your workflow.
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-left">
            Code Assist is here to elevate your coding experience and make coding faster, easier, and more enjoyable.
          </p>
        </motion.section>
      </main>
      <footer className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-700 text-gray-400' : 'bg-gray-100 border-gray-200 text-gray-600'} p-6 border-t text-center`}>
        <p>&copy; {new Date().getFullYear()} Code Assist. All rights reserved.</p>
      </footer>
    </div>
  )
}
