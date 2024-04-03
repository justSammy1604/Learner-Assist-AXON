'use client'
import { IoHome } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

export default function Nav(){
    return<>
        <div className="w-100 h-100 bg-black-100 flex justify-evenly p-6">
            <button><IoHome /></button>
            <button><FaSearch /></button>
            <button><FaTrophy /></button>
            <button><FaUserCircle /></button>
        </div>
        </>
}