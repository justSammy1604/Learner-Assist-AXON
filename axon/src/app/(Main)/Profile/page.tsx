// Import necessary modules
'use client'
// Import necessary modules
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { GoDotFill } from "react-icons/go";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Home() {
  // Initialize state for session and status
  const { data: session } = useSession();
  const [status, setStatus] = useState<boolean>(false);

  // Use useEffect to set the status when session changes
  useEffect(() => {
    if (session && session.user && session.user.name) {
      setStatus(true);
    }
  }, [session]);

  return (
    <main>
      {/* Render user email if session is active */}
      {status && (
        <div className="absolute top-0 left-0">
          <GoDotFill className='size-10' />
        </div>
      )}
      <div className="flex justify-center">
        <div className="flex flex-col justify-center items-center p-10 gap-5">
          {/* Render avatar and email */}
          <Avatar className="w-40 h-40">
            <AvatarImage src={session && session.user && session.user.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p>{session && session.user && session.user.email}</p>
        </div>
      </div>
    </main>
  );
}