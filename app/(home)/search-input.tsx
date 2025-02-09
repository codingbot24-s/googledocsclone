"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, XIcon } from "lucide-react";
import { useState, useRef } from "react";
import useSearchParam  from "@/hooks/use-search-param";

export default function SearchInput() {

    const [value, setValue] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_,setSearch] = useSearchParam("search");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const handleClear = () => {
        setValue("");
        setSearch("");
        inputRef.current?.focus();
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSearch(value);
      inputRef.current?.focus();
    }

  return (
    <div className="flex-1 flex items-center justify-center">
      <form 
        onSubmit={handleSubmit}
      className="relative max-w-[720px] w-full">
        <Input
            value={value}
            onChange={handleChange}
            ref={inputRef}
            placeholder="Search"
            className="md:text-base placeholder:text-neutral-800 px-14 w-full border-none focus:bg-white"
        />
        <Button 
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
        >
          <SearchIcon />
        </Button>
        {
           value && 
           (

            <Button 
                onClick={handleClear}
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
            >
                <XIcon />
            </Button>

           )
        }
      </form>
    </div>
  );
}