import React, { useEffect, useState } from "react";
import { AppProps } from "next/app";
import "../styles/index.css";
import Head from "next/head";
import Logo from "../components/ui/Logo";
import Layout from "../components/Layout";
import { UserContextProvider } from "../utils/useSupabase";
import "regenerator-runtime/runtime";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { Analytics } from "@vercel/analytics/react";
import NextNProgress from "nextjs-progressbar";

const pageTitle = "I Have Spoken";
const description = "I Have Spoken - Create NFT's that talk";

function MyApp({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  useEffect(() => {
    const body = document.body;
    body.setAttribute("data-theme", "black");
  }, []);

  return (
    <>
      <NextNProgress
        color="#13db20"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <UserContextProvider>
          <Layout title="I have Spoken">
            <div className="flex">
              <Logo withName={true} />
            </div>
            <Component {...pageProps} />
          </Layout>
        </UserContextProvider>
      </SessionContextProvider>
      <Analytics />
    </>
  );
}

export default MyApp;
