import Image from "next/image";
import {Button} from "@/components/ui/button";
import connectDB from "@/lib/db";

export default async function Home() {
    const conn = await connectDB();
    console.log(conn);
  return (
    <div className={"flex min-h-screen flex-col items-center justify-between p-24" }>
      <Button >Click me</Button>
    </div>
  );
}
