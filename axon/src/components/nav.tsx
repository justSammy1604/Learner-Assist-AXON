'use client'
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";


export default function Nav(){
    return <div>

        <Button  onClick={()=>signOut()}>
            Signout
        </Button>
    </div>
}