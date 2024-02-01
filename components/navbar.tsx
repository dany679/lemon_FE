import PersistentDrawerLeft from "./mobile-drawer";
// import { UserButton } from "@clerk/nextjs";
const Navbar = async () => {
  return (
    <div className="flex items-center p-4">
      <PersistentDrawerLeft />
      <div className="flex w-full justify-end">
        {/* <UserButton afterSignOutUrl="/" /> */}
      </div>
    </div>
  );
};

export default Navbar;
