import { webTitle } from "@/utils/constants";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: `Registrar | ${webTitle}`,
  icons: {
    icon: "/logo.png",
  },
};
export default function AuthLayout({ children }: { children: ReactNode }) {
  return <main className="flex items-center justify-center h-full">{children}</main>;
}
