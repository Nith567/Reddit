import { FC } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Signin from "@/components/signin";
const Page: FC = () => {
  return (
    <div className="absolute inset-0">
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
        <Link href="/">
          <ChevronLeft className="mr-2 h-6 w-4 font-bold text-center  text-gray-400" />
          Home
        </Link>
        <Signin />
      </div>
    </div>
  );
};

export default Page;
