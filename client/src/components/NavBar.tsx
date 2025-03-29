// react icons
import { FaDiscord } from "react-icons/fa";
import { TbBrandGithubFilled, TbWorld } from "react-icons/tb";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between w-full relative h-auto bg-white px-4 boxShadow rounded-md ">
      {/* Removed logo section */}
      <img
        src="https://i.ibb.co.com/7xS3FxCW/mclx-500.png"
        alt="logo"
        className="w-[60px] "
      />

      {/* nav links */}
      <ul className="items-center gap-[20px] text-[1rem] text-[#424242] md:flex hidden">
        {/* Removed "home", "about us", "services", and their submenus */}
      </ul>

      <div className="flex items-center gap-[10px]">
        {/* Removed search input field */}

        <a target="_blank" href="https://discord.gg/dtbnYJctYv">
          <FaDiscord
            className="text-[1.6rem] cursor-pointer text-black hover:text-[#3B9DF8] transition-all duration-500"
            aria-label="Discord Icon"
          />
        </a>
        <a
          target="_blank"
          href="https://github.com/mozaddedalfeshani/mclxboard.git">
          <TbBrandGithubFilled
            className="text-[1.6rem] cursor-pointer text-black hover:text-[#3B9DF8] transition-all duration-500"
            aria-label="GitHub Icon"
          />
        </a>
        <a target="_blank" href="https://mclx.pages.dev/">
          <TbWorld
            className="text-[1.6rem] cursor-pointer text-black hover:text-[#3B9DF8] transition-all duration-500"
            aria-label="GitHub Icon"
          />
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
