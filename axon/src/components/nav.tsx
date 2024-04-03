'use client'
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { IoHome } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";

export default function Nav() {
    return <>
        <div className="w-full  bg-black-100 flex justify-evenly fixed bottom-0  border-t  border-white/10">
            <Link className="text-white/40 hover:text-white hover:bg-slate-100/10 transition-colors  p-10 text-lg" href={'/'}><IoHome /></Link>
            <Link className="text-white/40 hover:text-white hover:bg-slate-100/10 transition-colors p-10 text-lg" href={'/Search'}><FaSearch /></Link>
            <Link className="text-white/40 hover:text-white hover:bg-slate-100/10 transition-colors p-10 text-lg" href={'/LeaderBoard'}><FaTrophy /></Link>
            <Link className="text-white/40 hover:text-white hover:bg-slate-100/10 transition-colors p-10 text-lg" href={'/Profile'}><FaUserCircle /></Link>
        </div>
    </>
}