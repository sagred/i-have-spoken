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
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta property="og:title" content={pageTitle} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
        <title>{pageTitle}</title>

        <meta
          property="og:site_name"
          content={"I Have Spoken"}
          key="ogsitename"
        />
        <meta property="og:title" content={pageTitle} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
      </Head>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <UserContextProvider>
          <Layout title="I have Spoken">
            <div className="flex items-center justify-center bg-white text-black">
              <Logo />
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
