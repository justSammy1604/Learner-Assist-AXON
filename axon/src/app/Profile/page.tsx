'use client'
import CourseCard from "@/components/courseCard";
import { SvgSpinnersRingResize } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { config } from "@/config";
import { useState } from "react";





export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isFetching, setIsFetching] = useState(false)
  const [courses, setCourses] = useState<Array<{
    name: string,
    code: string
  }> | false>([])
  const search = () => {
    setIsFetching(true)
    fetch(`${config.server}/search?` + new URLSearchParams({
      query: searchQuery
    }))
      .then(resp => resp.json())
      .then(d => {
        setCourses(d.courses)
        console.log(d)
        setIsFetching(false)
      })

  }
  return (
    <main>
      Profile
    </main>
  );
}
