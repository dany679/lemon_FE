import { cn } from "@/lib/utils";
import ProviderRedux from "@/providers/redux-provider";
import ProviderToaster from "@/providers/tost-provider";
// import { ClerkProvider } from "@clerk/nextjs";
import ProviderMui from "@/providers/mui-provider";
import { NextAuthProvider } from "@/providers/next-provider";
import ProviderTanStack from "@/providers/tanstack-provider";
import { Session, getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { authOptions } from "./api/auth/[...nextauth]/options";
import "./globals.css";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
  title: string;
};

const inter = Inter({ subsets: ["latin"] });
export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" className="h-full min-h-full">
      <body className={cn("h-full min-h-full ", inter)}>
        <ProviderToaster />
        <NextAuthProvider session={session as Session}>
          <ProviderTanStack>
            <ProviderMui>
              <ProviderRedux>{children}</ProviderRedux>
            </ProviderMui>
          </ProviderTanStack>
        </NextAuthProvider>
      </body>
    </html>
  );
}
