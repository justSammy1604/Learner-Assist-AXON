"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogosGoogleIcon } from "@/components/icons";



export default function Page() {

  return (
    <main className="grid h-screen grid-cols-1 overflow-hidden">
      <div className="flex flex-col items-center justify-center w-full h-full gap-2  ">
        <div className={"flex flex-col gap-1 w-72"}>
          <h1
            className={" text-3xl font-black mb-2 text-center"}
          >
            Sign In
          </h1>
         
          
          <Button
            className="w-full py-8 mt-2 space-x-2"
   onClick={() => signIn("google")}
          >
            <span  className="text-md ">Sign In With Google</span> <LogosGoogleIcon/>
          </Button>

        </div>
      </div>
    </main>
  );
}
