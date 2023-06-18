import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useSupabaseStore from "./store/useSupabaseStore";
import useUser from "./store/useUser";

export const UserContextProvider: FC = ({ children }) => {
  const supabase = useSupabaseClient();

  const { setSupabaseClient, setIsSupabaseReady } = useSupabaseStore();
  const { setUser, setIsUserReady } = useUser();

  const [currentAuthState, setCurrentAuthState] = useState<string>("");

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      const { session } = data;
      setSupabaseClient(session);
      setIsUserReady(true);
      setUser(session?.user ?? null);
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event !== currentAuthState) {
          setSupabaseClient(session);
          setUser(session?.user ?? null);
          if (event === "SIGNED_IN") {
            setCurrentAuthState("SIGNED_IN");
          }
        }
      },
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [currentAuthState, supabase]);

  return <>{children}</>;
};
