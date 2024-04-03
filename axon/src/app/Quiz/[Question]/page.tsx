'use client'
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from 'framer-motion'

export default function Page() {
    
    const options = [
        "Library", "Framework", "Plugin", "App"
    ]
    const [selectedOption, setSelectedOption] = useState<string | null>("App")
    return <div>
        <div className="px-8 pt-6 ">
            <div className="w-full h-8 bg-neutral-950 rounded-full p-0.5 ">
                <motion.div initial={{ width: "0%" }} animate={{ width: "60%" }} transition={{ duration: 0.4 }} className="h-full transition-all bg-orange-400 rounded-full pt-1.5 px-4">
                    <div className="w-full h-1 bg-white/20 rounded-full" />
                </motion.div>
            </div>

        </div>

        <div className="p-8">
            <h1 className="text-2xl font-black">What is React?</h1>
        </div>
        <div className="grid grid-cols-2 gap-2  px-8">
            {options.map(option => <><Button onClick={() => option !== selectedOption ? setSelectedOption(option) : setSelectedOption(null)} className={`${selectedOption === option ? "border-b-4 border-l-4 bg-orange-300" : "hover:bg-orange-300 active:bg-orange-300  hover:border-b-4 hover:border-l-4 bg-orange-400"} h-16    rounded-bl-xl border-orange-500   relative`}>
                {option}
                {/* <div className="size-5 bg-white absolute top-1 right-1 rounded-full border-4 border-orange-600" /> */}
            </Button>
            </>)}
        </div>
        <div className={`${selectedOption !== null ? "" : "translate-y-24"} transition-transform fixed bottom-0 w-full p-2 pb-8 bg-orange-400 rounded-t-lg`}>
            <Button className="w-full h-12">Next</Button>
        </div>
    </div>
}
