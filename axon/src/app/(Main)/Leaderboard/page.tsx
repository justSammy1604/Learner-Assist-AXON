'use client'
import { useState, useEffect } from "react";
import { db } from "@/app/firebase/confing";
import { FaTrophy } from "react-icons/fa";
import {
  collection,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";

interface User {
  username: string;
  email: string;
  level: number;
}

export default function Home() {
  const [userData, setUserData] = useState<User[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, orderBy("level", "desc"));
        const querySnapshot = await getDocs(q);
        const userDataMap: Record<string, User> = {};

        querySnapshot.forEach((doc) => {
          const data = doc.data() as User;
          // Group users by email and keep only the highest level for each email
          if (!userDataMap[data.username] || userDataMap[data.username].level < data.level) {
            userDataMap[data.username] = data;
          }
        });

        const uniqueUserData = Object.values(userDataMap);
        setUserData(uniqueUserData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures this effect runs only once on page load

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFetching, setIsFetching] = useState(false);
  const [courses, setCourses] = useState<
    Array<{
      name: string;
      code: string;
    }> | false
  >([]);

  const search = () => {
    setIsFetching(true);
    fetch(`${config.server}/search?` + new URLSearchParams({
      query: searchQuery
    }))
      .then((resp) => resp.json())
      .then((d) => {
        setCourses(d.courses);
        console.log(d);
        setIsFetching(false);
      });
  };

  return (
    <main>
      <div className=" flex p-9 text-4xl gap-4 ">
        <p className=" flex text-4xl text-yellow-400 ">Leaderboard </p><FaTrophy className="text-yellow-400" />
      </div>
      {/* Display user data */}
      <div className=" px-10 flex flex-col gap-8">
      {userData.map((user, index) => (
        <div className=" bg-slate-600 rounded-2xl flex justify-between" key={index}>
          <a className=" p-4">{user.email}</a>
          <a className=" p-4">{user.level}</a>
        </div>
      ))}
      </div>
    </main>
  );
}
