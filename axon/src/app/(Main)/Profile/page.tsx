'use client'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { GoDotFill } from "react-icons/go";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from "next-auth/react";
import { db } from '@/app/firebase/confing';
import { collection, addDoc, setDoc, doc, query, where, getDocs } from 'firebase/firestore';

export default function Home() {
  const { data: session } = useSession();
  const [status, setStatus] = useState<boolean>(false);
  const [name, setName] = useState<any>(null); // Initialize as null
  const [email, setEmail] = useState<any>(null); // Initialize as null
  const [image, setImage] = useState<any>(null); // Initialize as null

  useEffect(() => {
    const fetchData = async () => {
      if (session && session.user && !status) {
        const { name, email, image } = session.user; // Destructure name, email, and image from session user data
        setName(name);
        setEmail(email);
        setImage(image);
        setStatus(true); // Set status to true to prevent multiple executions
        
        // Function to check if the user exists in the database
        const checkUserExistsInDatabase = async () => {
          try {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('email', '==', email));
            const querySnapshot = await getDocs(q);
            return !querySnapshot.empty;
          } catch (error) {
            console.error('Error checking user existence:', error);
            return true; // Return true to prevent adding user in case of error
          }
        };
    
        // Function to add user to the database
        const addUserToDatabase = async () => {
          try {
            await addDoc(collection(db, "users"), {
              username: name,
              email: email,
              img: image,
              level: 2,
              course: [{ course_id: "", course_name: "", course_progress: 0 }],
              friend: [{ friend_id: "" }],
              achievement: [
                { achievement_id: "01", achievement_name: "super 5", achievement_description: "solve first 5 questions", achievement_status: true },
                { achievement_id: "02", achievement_name: "super 10", achievement_description: "solve first 10 questions", achievement_status: true },
                { achievement_id: "03", achievement_name: "super 15", achievement_description: "solve first 15 questions", achievement_status: true }
              ]
            });
            console.log("User data added to the database.");
          } catch (error) {
            console.error("Error adding user data to the database: ", error);
          }
        };
    
        // Check if the user is authenticated and not added to the database before
        const userDataExists = await checkUserExistsInDatabase();
        if (!userDataExists) {
          await addUserToDatabase(); // Add user to the database if not already present
        }
      }
    };
  
    fetchData();
  }, [session, status]); // Dependency array ensures this effect runs only once when session or status changes

  return (
    <main>
      {/* Render user email if session is active */}
      <div className='flex flex-row-reverse justify-between'>
        <p className="block px-4 py-2 text-white-800 cursor-pointer" onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })}>Log out</p>
        {status && (
          <div className="">
            <GoDotFill className='size-10 text-lime-500' />
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex flex-col justify-center items-center p-10 gap-5">
          {/* Render avatar and email */}
          <Avatar className="w-40 h-40 border-solid border-white border-4">
            <AvatarImage src={session && session.user && session.user.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p>{session && session.user && session.user.name}</p>
        </div>

        <div className='flex flex-col px-10 gap-10'>
          <h3 className='m-0'>Level:</h3>
        
          <div>
            <h3>Achievements:</h3>
          </div>

          <div>
            <h3>courses:</h3>
          </div>
        </div>
      </div>
    </main>
  );
} 
