import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

const Logo = () => {
  const router = useRouter();
  const { username } = router.query;
  
  return (
    <Link href={"/"}>
      <h1 className="font-Josefin text-4xl font-bold">I HAVE SPOKEN</h1>
    </Link>
  );
};

export default Logo;
