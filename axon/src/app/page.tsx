'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";






export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string | null>(null)
  const search = () => {
  }
  return (
    <main>
      <div className="p-8 space-y-2">
        <Input onChange={(e) => setSearchQuery(e.target.value)} className="h-12 " placeholder="Search" />
        <Button disabled={searchQuery===null} onClick={search} className="w-full h-12 text-lg">Search</Button>
      </div>
    </main>
  );
}
