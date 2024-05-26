import PersistentDrawerLeft from "@/components/persistent-drawer-left";

import { webTitle } from "@/utils/constants";
import type { Metadata, ResolvingMetadata } from "next";
import { headers } from "next/headers";
import { ReactNode } from "react";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
  title: string;
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const headersList = headers();
  const referer = headersList.get("referer");
  const title = headers().get("title");
  return {
    title: ` ${title} | ${webTitle}`,
    icons: {
      icon: "/logo.png",
    },
  };
}

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className=" h-full min-h-full relative ">
      <PersistentDrawerLeft />
      <main className="pt-20 p-4 flex flex-col h-screen justify-between ">{children}</main>
    </div>
  );
}
