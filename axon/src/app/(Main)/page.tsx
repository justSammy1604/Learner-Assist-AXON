'use client'

import { useEffect, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useGameStore from "@/components/state";
import { useRouter } from "next/navigation";




export default function Home() {
  const router=useRouter()
  const [currentCourse, setCurrentCourse] = useState<string | null>(null)
  const {playerLives}=useGameStore()
  useEffect(() => {
    setCurrentCourse(localStorage.getItem('currentCourse'))
  }, [])
  return (
    <main className="p-8 ">
      <h1 className="text-3xl font-bold">{currentCourse}</h1>

      <div className="mt-2  pb-12">
        <h3 className="font-medium ">Topics You Will Learn</h3>
        <ul className=" text-sm ">
          <li>
            Topic 1
          </li>
          <li>
            Topic 2
          </li>
        </ul>

      </div>
      <div>
        <Button disabled={playerLives===0} onClick={()=>router.push('/Quiz/2132')} className="w-full py-3 bg-orange-400  h-16 text-lg p-4 rounded-md hover:bg-orange-300  ">Start Quiz</Button>
      </div>
    </main>
  );
}
