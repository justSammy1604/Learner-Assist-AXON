'use client'
import CourseCard from "@/components/courseCard";
import { SvgSpinnersRingResize } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { config } from "@/config";
import { useState } from "react";
import firebase from 'firebase/app';
import 'firebase/database';
import { initializeApp } from 'firebase/app';
import { Database, getDatabase } from 'firebase/database';
import { firebaseConfig } from '../../../../firebase/firebaseconfig'

interface Course {
  name: string;
  code: string;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [courses, setCourses] = useState<Course[] | false>([]);


  const search = () => {
    setIsFetching(true);
    fetch(`${config.server}/search?` + new URLSearchParams({
      query: searchQuery
    }))
      .then(resp => resp.json())
      .then(d => {
        setCourses(d.courses);
        console.log(d);
        setIsFetching(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setIsFetching(false);
      });
  }
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  console.log(database);
  

  return (
    <main>
      <div className="bg-white-100 h-10 w-100">
        <div>
          <img src="" alt="Logo" />
        </div>
      </div>
    </main>
  );
}
