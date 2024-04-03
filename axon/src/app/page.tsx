import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";



export default function Home() {
  return (
    <main>
      <div className="p-8">
        <Input placeholder="dfgdfgh" />
        
        <Button className="w-full h-12 text-lg">Search</Button>
      </div>
    </main>
  );
}
