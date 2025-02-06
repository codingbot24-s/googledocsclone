import Link from "next/link";
import Image from "next/image";
import SearchInput from "./search-input";
import { UserButton } from "@clerk/nextjs" 

export default function Navbar() {
  return  (
    <nav className="flex items-center justify-between h-full w-full">
        <div className="flex gap-3 items-center shrink-0 pr-6">
            <Link href={"/"}>
                <Image src={"/icon.png"} alt="logo" width={36} height={36}></Image>
            </Link>
            <h3 className="text-xl">
                Docs
            </h3>
        </div>
        <SearchInput />
        <UserButton/>
    </nav>  
  )
}
