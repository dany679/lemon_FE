import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const HeadingRoot = ({ children, className = "mb-[-30px]" }: { children: ReactNode; className?: string }) => {
  return <div className={cn("px-4 lg:px-8 flex items-center gap-x-3 gap-y-0 ", className)}>{children}</div>;
};

export default HeadingRoot;
