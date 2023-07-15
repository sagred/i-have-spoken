import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";

const Logo = ({ withName }) => {
  const router = useRouter();
  const { username } = router.query;

  return (
    <Link href={"/"}>
      <div className="mt-5 flex items-center">
        <Image src={"/logo.png"} width={100} alt="Logo" height={100} />

        {withName ? (
          <RoughNotation
            animationDelay={1000}
            animationDuration={1000}
            type="highlight"
            color="white"
            show={true}
          >
            <h1 className="text-4xl font-bold text-black ">IHaveSpoken.xyz</h1>
          </RoughNotation>
        ) : null}
      </div>
    </Link>
  );
};

export default Logo;
