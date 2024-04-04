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
  const [level, setLevel] = useState<number | null>(null); // Initialize as null for user level
  const [achievements, setAchievements] = useState<any[]>([]); // State to store achievements

 

  return (
    <main>
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
          <Avatar className="w-40 h-40 border-solid border-white border-4">
            <AvatarImage src={session && session.user && session.user.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p>{session && session.user && session.user.name}</p>
        </div>

        <div className='flex flex-col px-10 gap-10'>
          <h3 className='m-0'>Level: {level}</h3> {/* Display user's level */}
        
          <div>
            <h3>Achievements:</h3>
            <div className="flex gap-2">
              {achievements.map((achievement: any) => (
                <div key={achievement.achievement_id}>
                  <img className=' w-12 h-12' src={achievement.achievement_img} alt={achievement.achievement_name} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3>courses:</h3>
          </div>
        </div>
      </div>
    </main>
  );
}