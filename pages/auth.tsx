import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useUser from "../utils/store/useUser";
import Image from "next/image";
import GoogleIcon from "../public/icons/google.png";
import { LinkedInIcon, TwitterIcon } from "../components/Icons";

export default function LoginPage() {
  const router = useRouter();
  const supabase = useSupabaseClient();

  const [loading, setLoading] = useState(false);
  const { user, isUserReady } = useUser();

  useEffect(() => {
    if (isUserReady) {
      if (user != null) {
        router.push("/");
      }
    }
  }, [user, isUserReady]);

  const handleGoogleAuth = async () => {
    setLoading(true);

    const { data: user, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    // If the user doesn't exist in Supabase, create a new user
    if (!user) {
      setLoading(false);
      return;
    }

    // Redirect the user to the homepage after successful login
    router.push("/");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="flex max-w-sm flex-col items-center justify-center md:mx-0">
          <h3 className="mt-52 text-xl font-semibold">Login</h3>
          <button
            className="btn mx-10 mt-10 w-full bg-white normal-case text-black hover:bg-neutral-300"
            disabled={loading}
            onClick={handleGoogleAuth}
          >
            <Image src={GoogleIcon} alt="google" width={20} />
            <span className="ml-4">
              {loading ? "Loading..." : "Continue with Google"}
            </span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 flex w-full max-w-md flex-col items-center justify-center">
        <div className="flex w-full max-w-md items-center justify-center bg-indigo-700 p-2">
          <a
            className="mr-5"
            target={"_blank"}
            href="https://twitter.com/sagredd"
          >
            <span className=" cursor-pointer hover:opacity-80">
              <TwitterIcon />
            </span>
          </a>

          <a target={"_blank"} href="https://linkedin.com/in/sagred/">
            <span className="cursor-pointer hover:opacity-80 ">
              <LinkedInIcon />
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
