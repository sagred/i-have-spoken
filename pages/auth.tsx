import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useUser from "../utils/store/useUser";
import Image from "next/image";
import GoogleIcon from "../public/icons/google.png";
import { LinkedInIcon, TwitterIcon } from "../components/Icons";
import Logo from "../components/ui/Logo";

export default function LoginPage() {
  const router = useRouter();

  const redirect_to = router.query.redirect_to ?? "";

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
      options: { redirectTo: `https://ihavespoken.xyz/${redirect_to}` },
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
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex max-w-sm flex-col items-center justify-start md:mx-0">
          <h3 className="mt-20 text-xl font-semibold"></h3>
          <Logo withName={false} />
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
    </>
  );
}
