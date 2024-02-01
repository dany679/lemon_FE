import PersistentDrawerLeft from "@/components/mobile-drawer";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" h-full min-h-full relative ">
      <PersistentDrawerLeft />
      <main className="pt-14 p-4 h-full min-h-full ">{children}</main>
    </div>
  );
}
