import React from "react";
import { Link } from 'react-router-dom';
import { useState } from "react"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { ScrollArea } from "../ui/scroll-area";
import { Code, MessageSquare, Bug, PenTool, Settings } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { getGeminiCompletion } from "../../api/gemini";
import { Prompts } from "../../utils/prompt";
const prompts = Prompts();

type Functionality = "refactor" | "addComments" | "fixBugs" | "codeFormatting" | "customInstructions"

export default function CodeAssist() {
  const [selectedFunctionality, setSelectedFunctionality] = useState<Functionality>("refactor")
  const [code, setCode] = useState("")
  const [customInstructions, setCustomInstructions] = useState("")
  const [output, setOutput] = useState("")

  const functionalities: { id: Functionality; name: string; description: string; icon: React.ReactNode }[] = [
    { id: "refactor", name: "Refactor Code", description: "Optimize your code for performance and readability.", icon: <Code className="w-6 h-6" /> },
    { id: "addComments", name: "Add Comments", description: "Improve code readability with meaningful comments.", icon: <MessageSquare className="w-6 h-6" /> },
    { id: "fixBugs", name: "Fix Bugs", description: "Identify and resolve issues in your codebase.", icon: <Bug className="w-6 h-6" /> },
    { id: "codeFormatting", name: "Code Formatting", description: "Ensure code consistency with formatting enforced by ESLint rules.", icon: <PenTool className="w-6 h-6" /> },
    { id: "customInstructions", name: "Custom Instructions", description: "Provide your own instructions for code processing.", icon: <Settings className="w-6 h-6" /> },
  ]

  const handleSubmit = async () => {
    const instructions = selectedFunctionality === "customInstructions" ? customInstructions : "";
    const prompt = `${prompts[selectedFunctionality]}, ${instructions}, \n \n ${code} \n If no code is provided, respond with: "Please provide a code snippet." `;
    const result = await getGeminiCompletion("", prompt); 
    setOutput(`${result}`);
  };

  return (
    <div className="flex flex-col h-screen bg-black text-gray-300">
      <header className="bg-zinc-900 p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center gap-2 hover:text-white transition-colors">
        <FontAwesomeIcon icon={faRobot} />
          Code Assist
        </Link>
        <nav>
          <a href="/about" className="hover:text-white transition-colors">About Us</a>
        </nav>
      </header>
      <main className="flex flex-1 overflow-hidden">
        <aside className="w-80 bg-zinc-900 p-4 overflow-y-auto">
          {functionalities.map((func) => (
            <button
              key={func.id}
              onClick={() => setSelectedFunctionality(func.id)}
              className={`w-full text-left mb-4 p-4 rounded-lg transition-colors ${
                selectedFunctionality === func.id ? "bg-zinc-800" : "bg-zinc-900 hover:bg-zinc-800"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                {func.icon}
                <span className="font-semibold text-white">{func.name}</span>
              </div>
              <p className="text-sm text-gray-400">{func.description}</p>
            </button>
          ))}
          {selectedFunctionality === "customInstructions" && (
            <div className="mt-4">
              <Textarea
                placeholder="Enter custom instructions..."
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                className="w-full h-40 bg-zinc-800 text-white border-zinc-700 focus:border-zinc-600 focus:ring-zinc-600"
              />
            </div>
          )}
        </aside>
        <section className="flex-1 flex flex-col p-4 bg-black">
          <Textarea
            placeholder="Enter your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 mb-4 bg-zinc-900 text-white border-zinc-700 focus:border-zinc-600 focus:ring-zinc-600 rounded-lg p-4"
          />
          <Button onClick={handleSubmit} className="bg-cyan-600 hover:bg-cyan-700 text-white mb-4">
            Process Code
          </Button>
          <ScrollArea className="flex-1 bg-zinc-900 rounded-lg p-4">
          <pre className="text-gray-400 whitespace-pre-wrap font-mono text-sm text-left">{output}</pre>
          </ScrollArea>
        </section>
      </main>
    </div>
  )
}
