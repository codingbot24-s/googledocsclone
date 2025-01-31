import Image from "next/image";
import Link from "next/link";
import DocumentInput from "./document-input";

export default function Navbar() {
 return(
    <nav className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
            <Link href={"/"}>
                <Image src={"/logo.svg"} alt="logo" width={36} height={36}></Image>
            </Link>
            <div className="flex flex-col">
                <DocumentInput />
            </div>
        </div>
    </nav>
 )   
}