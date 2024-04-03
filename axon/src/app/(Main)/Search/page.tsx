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
      <div className="p-8 space-y-2">
        <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="h-12 " placeholder="Enter Topic" />
        <Button disabled={searchQuery === ""} onClick={search} className={`w-full h-12 text-lg space-x-3  ${isFetching ? "animate-pulse" : ""}`}><span>Search</span> {isFetching && <SvgSpinnersRingResize />}</Button>
      </div>
      <div className="px-8">
        {courses!==false?courses.map((course) =>
          <CourseCard courseCode={course.code} courseName={course.name} />
        ):"No Courses Found"
        }
      </div>
    </main>
  );
}
