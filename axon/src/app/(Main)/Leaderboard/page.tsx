'use client'
import { useState, useEffect } from "react";
import { db } from "@/app/firebase/confing";
import {
  collection,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";

interface User {
  username: string;
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
        const userData = querySnapshot.docs.map((doc) => doc.data() as User);
        setUserData(userData);
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
      Leaderboard
      {/* Display user data */}
      {userData.map((user, index) => (
        <div key={index}>
          <p>{user.username}: {user.level}</p>
        </div>
      ))}
    </main>
  );
}
