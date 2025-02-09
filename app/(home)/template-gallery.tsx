"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Templates } from "../constant/template";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface Template {
  id: string;
  label: string;
  imageUrl: string;
}
export default function TemplateGallery() {
  const router = useRouter();
  const create = useMutation(api.document.create);
  const [isCreating, setIsCreating] = useState(false);

  const onTemplateClick = async (title: string, initialContent: string) => {
    setIsCreating(true);
    create({
      title,
      initialContent,
    })
      .catch((e) => {
        toast.error(e.message);
      })

      .then((documentId) => {
        toast.success("Document created");
        router.push(`/document/${documentId}`);
      })
      .finally(() => {
        setIsCreating(false);
      });
  };

  return (
    <div className="bg-[#F1F3F4]">
      <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4">
        <h3 className="text-base font-medium">start a new document</h3>
        <Carousel>
          <CarouselContent className="-ml-4">
            {Templates.map((template: Template) => (
              <CarouselItem
                key={template.id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 pl-4"
              >
                <div
                  className={cn(
                    "aspect-[3/4] flex flex-col gap-y-2.5",
                    isCreating && "pointer-events-none opacity-50"
                  )}
                >
                  <button
                    disabled={isCreating}
                    onClick={() => onTemplateClick(template.label, "")}
                    style={{
                      backgroundImage: `url(${template.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="w-full h-full hover:border-blue-500 rounded-sm border hover:bg-blue-50 transition flex flex-col items-center justify-center gap-y-4 bg-white"
                  ></button>
                  <p className="text-sm font-medium truncate">
                    {template.label}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="flex items-center justify-center"></CarouselPrevious>
          <CarouselNext className="flex items-center justify-center"></CarouselNext>
        </Carousel>
      </div>
    </div>
  );
}
