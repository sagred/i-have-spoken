import Link from "next/link";
import React from "react";
import Logo from "./ui/Logo";

const Header = () => {
  return (
    <div className="flex w-full flex-col p-3 md:mt-4 md:flex-row md:items-center md:justify-between">
      <Logo />
      <div className="flex flex-col md:mr-5 md:flex-row md:items-center">
        <Link href="/">
          <button className="mt-2 md:mx-5 md:mt-0">Feed</button>
        </Link>
        <Link href="/generate">
          <button className="mt-2 md:mx-5 md:mt-0">Generate</button>
        </Link>
        <Link href="/challenges">
          <button className="mt-2 md:mx-5 md:mt-0">Challenges</button>
        </Link>
        <Link href="/games">
          <button className="mt-2 md:mx-5 md:mt-0">Games</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
