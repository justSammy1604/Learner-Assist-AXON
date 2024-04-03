'use client'
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from 'framer-motion'

export default function Page() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [isComplete, setCompleted] = useState(false)
    const mcq = {
        questions: [
            {
                "question": "What is React?",
                "options": ["Library", "Framework", "Language", "Application"],
                "correct": 0
            },
            {
                "question": "What is Vue.js?",
                "options": ["Library", "Framework", "Language", "Database"],
                "correct": 1
            },
            {
                "question": "What is Angular?",
                "options": ["Library", "Framework", "Language", "Server"],
                "correct": 1
            },
            {
                "question": "What is JavaScript?",
                "options": ["Library", "Framework", "Language", "IDE"],
                "correct": 2
            },
            {
                "question": "What is MongoDB?",
                "options": ["Library", "Framework", "Language", "Database"],
                "correct": 3
            }
        ]
    }
    const options = [
        "Library", "Framework", "Plugin", "App"
    ]
    const [selectedOption, setSelectedOption] = useState<string | null>("App")
    return <div>
        <div className="px-8 pt-6 flex items-center  justify-between gap-2 ">
            <div className="w-full h-8 bg-neutral-950 rounded-full p-0.5 ">
                <div style={{ width: `${((currentQuestion + 1) / mcq.questions.length) * 100}%` }} className="h-full transition-all duration-500 ease-in-out bg-orange-400 rounded-full pt-1.5 px-4">
                    <div className="w-full h-1 bg-white/20 rounded-full" />
                </div>
            </div>
            <div className="h-8 w-8 bg-white rounded-full">

            </div>
        </div>

        <div className="p-8">
            <h1 className="text-2xl font-black">{mcq.questions[currentQuestion].question}</h1>
        </div>
        <div className="grid grid-cols-2 gap-2  px-8">
            {mcq.questions[currentQuestion].options.map(option => <><Button onClick={() => option !== selectedOption ? setSelectedOption(option) : setSelectedOption(null)} className={`${selectedOption === option ? "border-b-4 border-l-4 bg-orange-300" : "hover:bg-orange-300  hover:border-b-4 hover:border-l-4 bg-orange-400"} h-16  active:bg-orange-300   rounded-bl-xl border-orange-500   relative`}>
                {option}
                {/* <div className="size-5 bg-white absolute top-1 right-1 rounded-full border-4 border-orange-600" /> */}
            </Button>
            </>)}
        </div>
        <div className={`${selectedOption !== null ? "" : "translate-y-24"} transition-transform fixed bottom-0 w-full p-4 pb-8 bg-orange-400 rounded-t-lg`}>

            <Button onClick={() => currentQuestion < (mcq.questions.length - 1) ? setCurrentQuestion(currentQuestion + 1) : setCompleted(true)} className="w-full h-12">Next</Button>
        </div>
    </div>
}
