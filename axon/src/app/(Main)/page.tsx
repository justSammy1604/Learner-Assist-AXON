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




export default function Home() {
  const [currentCourse, setCurrentCourse] = useState<string | null>(null)
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
        <Link href={'/Quiz/2132'} className="w-full py-3 bg-orange-400 block p-4 rounded-md hover:bg-orange-300  ">Start Quiz</Link>
      </div>
    </main>
  );
}
