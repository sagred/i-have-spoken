import Elon from "../public/elon.png";
import Robert from "../public/robert.png";
import KR from "../public/keanuReeves.png";
import SRK from "../public/SRK.png";
import TH from "../public/tomHolland.png";
import CE from "../public/chrisEvans.png";
import Logo from "../components/ui/Logo";
import Image from "next/image";
import Link from "next/link";
import { GithubIcon, LinkedInIcon, TwitterIcon } from "../components/Icons";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import Meta from "../components/Meta";
import useUser from "../utils/store/useUser";

const supabaseUrl = "https://gtrvjdtwdfnbjeytdjvv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0cnZqZHR3ZGZuYmpleXRkanZ2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MjA0NTU4MSwiZXhwIjoxOTk3NjIxNTgxfQ.ngROr05aRAXWDnPvI3xpvxfBjzLvb36_8TBv6Ouwb2c";
const supabase = createClient(supabaseUrl, supabaseKey);

const Upcoming = ({ imageSrc, name }) => {
  return (
    <div className="group relative m-2 rounded-sm border border-white opacity-60">
      <div className={`absolute -inset-1  opacity-100  blur-3xl`}>
        <Image
          src={imageSrc}
          alt="Elon"
          className="w-40  rounded-sm object-cover"
          width={200}
          height={200}
        />
      </div>
      <div className="items-top relative flex justify-start leading-none ring-1 ring-gray-900/5">
        <div className="flex items-center justify-center ">
          <Image
            src={imageSrc}
            alt="RDJ"
            className="w-40 rounded-sm object-cover"
            width={200}
            height={200}
          />
        </div>
      </div>
      <h3 className="bg-white text-center font-semibold text-black">{name}</h3>
    </div>
  );
};

const IndexPage = ({ agents }) => {
  const router = useRouter();
  const { isUserReady, user } = useUser();
  

  return (
    <>
      <Meta ogImgUrl="https://gtrvjdtwdfnbjeytdjvv.supabase.co/storage/v1/object/public/sagred/images/meta.png" />
      <div className="flex flex-col items-start justify-center px-2 md:px-0">
        <h3 className="z-50 mt-5 w-full  p-1  text-2xl font-bold text-white">
          Choose to speak
        </h3>
      </div>
      <div className="mt-4 flex flex-col items-start justify-center">
        {/* <h3 className="h-50 m-2 flex w-40 items-start justify-center bg-white p-2 text-lg font-semibold text-black">
          <Link href={`/create`}>
            <p className="flex ">+ Create</p>
          </Link>
        </h3> */}
        <div className="flex h-full max-w-xl flex-wrap items-center justify-center md:justify-start">
          {agents.map((agent, indx) => {
            return (
              <div key={indx}>
                <Link href={`/nft/${agent.username}`} key={agent.username}>
                  <div className="group relative m-2 rounded-sm border border-white">
                    <div className={`absolute -inset-1  opacity-100  blur-3xl`}>
                      <img
                        src={agent.image_url}
                        alt="My Image"
                        className="w-40  rounded-sm object-cover"
                        width={200}
                        height={200}
                      />
                    </div>
                    <div className="items-top relative flex justify-start leading-none ring-1 ring-gray-900/5">
                      <div className="flex items-center justify-center ">
                        <img
                          src={agent.image_url}
                          alt="My Image"
                          className="w-40 rounded-sm object-cover"
                          width={200}
                          height={200}
                        />
                      </div>
                    </div>
                    <h3 className="bg-white text-center font-semibold text-black">
                      {agent.name}
                    </h3>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        <h3 className="z-50 mt-14 w-full bg-white p-1 text-center text-lg font-medium text-black">
          Upcoming
        </h3>
        <div className="mt-4 flex h-full w-full max-w-5xl flex-wrap items-start justify-center md:justify-start">
          <Upcoming imageSrc={Robert} name={"Iron Man"} />
          <Upcoming imageSrc={KR} name={"John Wick"} />
          <Upcoming imageSrc={TH} name={"Spider Man"} />
          <Upcoming imageSrc={CE} name={"Captain America"} />
        </div>

        <div className="z-50 mt-14 flex w-full flex-col items-center justify-center bg-indigo-700 p-1 py-5 text-center  text-white">
          <h3 className="text-lg font-medium">Coming Soon - AAA</h3>
          <h3 className="text-md max-w-xs">
            Voice chat with Anyone, Anywhere, Anytime
          </h3>
        </div>
      </div>
    </>
  );
};

export default IndexPage;

export const getServerSideProps = async () => {
  const { data, error } = await supabase.from("agents").select("*");

  if (error) {
    console.error("Error fetching agents:", error.message);
    return;
  }

  return { props: { agents: data } };
};
