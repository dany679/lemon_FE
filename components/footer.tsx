import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="w-full mx-auto sm:px-20 px-4 shadow border-t py-3 border-1 border-top-stone-900 ">
      <div className="flex  flex-col md:flex-row md:justify-between text-center ">
        <div className="flex flex-row items-center justify-center space-x-1 ">
          © 2024 Danie Rosa<a href="/" className="hover:underline"></a>
        </div>

        <div className="flex flex-row items-center justify-center space-x-1 text-neutral-800 dark:text-neutral-100">
          {/* <button
            onClick={async () => {
              try {
                await navigator.clipboard.writeText("+55(38)988273087");
              } catch (error) {}
            }}
            className="flex items-center justify-center space-x-1 border-0  bg-transparent hover:bg-transparent transition duration-300 ease-in-out cursor-pointer h-fit mb-2"
          >
            <PhoneIphoneIcon className="button_icons mx-2 text-cyan-800 hover:text-sky-500" />
          </button> */}
          <Link href="https://github.com/dany679" rel="noreferrer" target="_blank" data-testid="link-github">
            <GitHubIcon className="button_icons mx-2 text-gray-800 hover:text-gray-500" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/danie-dev/"
            rel="noreferrer"
            target="_blank"
            data-testid="link-linkedin"
          >
            <LinkedInIcon className="button_icons mx-2  text-sky-800 hover:text-sky-500" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
