import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { ScrollArea } from "../ui/scroll-area";
import { Code, MessageSquare, Bug, PenTool, Settings, Sun, Moon, Menu, X } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { getGeminiCompletion } from "../../api/gemini";
import { Prompts } from "../../utils/prompt";
import { useTheme } from "../context/ThemeContext";
import { signOut } from '../../firebase/auth.js'

const prompts = Prompts();
type Functionality = "refactor" | "addComments" | "fixBugs" | "codeFormatting" | "customInstructions" | null

export default function CodeAssist() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [selectedFunctionality, setSelectedFunctionality] = useState<Functionality>(null)
  const [code, setCode] = useState("")
  const [customInstructions, setCustomInstructions] = useState("")
  const [output, setOutput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const functionalities: { id: Functionality; name: string; description: string; icon: React.ReactNode }[] = [
    { id: "refactor", name: "Refactor Code", description: "Optimize your code for performance and readability.", icon: <Code className="w-6 h-6" /> },
    { id: "addComments", name: "Add Comments", description: "Improve code readability with meaningful comments.", icon: <MessageSquare className="w-6 h-6" /> },
    { id: "fixBugs", name: "Fix Bugs", description: "Identify and resolve issues in your codebase.", icon: <Bug className="w-6 h-6" /> },
    { id: "codeFormatting", name: "Code Formatting", description: "Ensure code consistency with formatting enforced by ESLint rules.", icon: <PenTool className="w-6 h-6" /> },
    { id: "customInstructions", name: "Custom Instructions", description: "Provide your own instructions for code processing.", icon: <Settings className="w-6 h-6" /> },
  ]

  const handleSubmit = async () => {
    if (!selectedFunctionality) {
      setOutput("Please select a functionality before processing the code.");
      return;
    }
    setOutput("");
    setIsLoading(true);
    const instructions = selectedFunctionality === "customInstructions" ? customInstructions : "";
    const prompt = `${prompts[selectedFunctionality]}, ${instructions}, \n \n ${code} \n If no code is provided, respond with: "Please provide a code snippet." Even one line of code should be considered as code `;
    const result = await getGeminiCompletion("", prompt); 
    setIsLoading(false);
    setOutput(`${result}`);
  };

  const handleFunctionalitySelect = (functionality: Functionality) => {
    setSelectedFunctionality(functionality);
    setIsModalOpen(false);
  };

  return (
    <div className={`flex flex-col h-screen ${theme === "dark" ? "bg-black text-gray-300" : "bg-white text-black"}`}>
      <header className={`p-4 flex justify-between items-center ${theme === "dark" ? "bg-zinc-900" : "bg-gray-100"} transition-colors`}>
        <Link to="/main" className={`text-xl font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`}>
          <FontAwesomeIcon icon={faRobot} />
          Code Assist
        </Link>
        
        <div className="flex items-center gap-4">
          <button onClick = {async () => {
            await signOut()
          }} className="hover:text-red-500 transition-colors">
            Sign Out
          </button>
          <nav className="hidden md:block">
            <button onClick={()=>{
              navigate('/');
            }} className="hover:text-primary transition-colors">About Us</button>
          </nav>
          <button onClick={toggleTheme} className={`p-2 rounded-full ${theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-gray-700'}`}>
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </button>
          <button
            className="md:hidden"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setIsModalOpen(false)}></div>
          <div className={`relative w-full max-w-md p-6 rounded-lg shadow-xl ${theme === "dark" ? "bg-zinc-800" : "bg-white"}`}>
            <button
              className="absolute top-2 right-2"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className={`text-xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-black"}`}>Select Functionality</h2>
            {functionalities.map((func) => (
              <button
                key={func.id}
                onClick={() => handleFunctionalitySelect(func.id)}
                className={`w-full text-left mb-4 p-4 rounded-lg transition-colors ${
                  selectedFunctionality === func.id
                    ? `${theme === "dark" ? "bg-zinc-700" : "bg-gray-300"}`
                    : `${theme === "dark" ? "bg-zinc-900 hover:bg-zinc-700" : "bg-gray-100 hover:bg-gray-200"}`
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  {func.icon}
                  <span className="font-semibold">{func.name}</span>
                </div>
                <p className="text-sm">{func.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      <main className={`flex flex-1 overflow-hidden ${isModalOpen ? 'filter blur-sm' : ''}`}>
        <aside className={`w-80 p-4 overflow-y-auto ${theme === "dark" ? "bg-zinc-900" : "bg-gray-100"} transition-colors hidden md:block`}>
          {functionalities.map((func) => (
            <button
              key={func.id}
              onClick={() => setSelectedFunctionality(func.id)}
              className={`w-full text-left mb-4 p-4 rounded-lg transition-colors ${
                selectedFunctionality === func.id
                  ? `${theme === "dark" ? "bg-zinc-800" : "bg-gray-200"}`
                  : `${theme === "dark" ? "bg-zinc-900 hover:bg-zinc-800" : "bg-gray-100 hover:bg-gray-200"}`
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                {func.icon}
                <span className="font-semibold">{func.name}</span>
              </div>
              <p className="text-sm">{func.description}</p>
            </button>
          ))}

          {selectedFunctionality === "customInstructions" && (
            <div className="mt-4">
              <Textarea
                placeholder="Enter custom instructions..."
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                className={`w-full h-40 ${theme === "dark" ? "bg-zinc-800 text-white border-zinc-700" : "bg-gray-200 text-black border-gray-400"} focus:ring-primary`}
              />
            </div>
          )}
        </aside>

        <section className="flex-1 flex flex-col md:flex-row overflow-hidden">
          <div className="flex-1 flex flex-col p-6 border-r transition-colors border-zinc-700">
            <h2 className={`text-xl font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}>Input Code</h2>
            <Textarea
              placeholder="Enter your code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`flex-1 ${theme === "dark" ? "bg-zinc-900 text-white border-zinc-700" : "bg-gray-200 text-black border-gray-400"} focus:ring-primary rounded-lg p-4 mb-4`}
            />
            <Button
              onClick={handleSubmit}
              className="bg-zinc-700 hover:bg-zinc-600 text-white px-8 py-2 rounded-s-full rounded-e-full transition-colors self-end"
            >
              Process Code
            </Button>
          </div>

          <div className="flex-1 flex flex-col p-6">
            <h2 className={`text-xl font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}>Output</h2>
            <ScrollArea className={`flex-1 ${theme === "dark" ? "bg-zinc-900" : "bg-gray-200"} rounded-lg p-4 border ${theme === "dark" ? "border-zinc-700" : "border-gray-400"}`}>
              {isLoading && (
                <div className="absolute top-2 left-2 flex space-x-1 items-center">
                  <div className="h-3 w-3 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-3 w-3 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-3 w-3 bg-gray-400 rounded-full animate-bounce"></div>
                </div>
              )}
              <pre className="whitespace-pre-wrap font-mono text-sm text-left">{output}</pre>
            </ScrollArea>
          </div>
        </section>
      </main>
    </div>
  );
}
