import { useEffect, useState } from "react";
import Mic from "../../public/microphone-svgrepo-com.svg";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import dynamic from "next/dynamic";
import Image from "next/image";
import useUser from "../../utils/store/useUser";
import { useRouter } from "next/router";
import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";
import { createClient } from "@supabase/supabase-js";
import Head from "next/head";
import Meta from "../../components/Meta";

const appId = process.env.NEXT_PUBLIC_SPEECHLY_APP_ID;
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

const supabaseUrl = "https://gtrvjdtwdfnbjeytdjvv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0cnZqZHR3ZGZuYmpleXRkanZ2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MjA0NTU4MSwiZXhwIjoxOTk3NjIxNTgxfQ.ngROr05aRAXWDnPvI3xpvxfBjzLvb36_8TBv6Ouwb2c";
const supabase = createClient(supabaseUrl, supabaseKey);

const IndexPage = ({ agent }) => {
  console.log(agent);
  const router = useRouter();

  const { username } = router.query;

  const [audioSrc, setAudioSrc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [speechText, setSpeechText] = useState("");

  const [isMicOn, setIsMicOn] = useState(false);
  const [isMicStarted, setIsMicStarted] = useState(false);

  const { user, isUserReady } = useUser();

  useEffect(() => {
    if (isUserReady) {
      // if (user === null) {
      //   router.push("/auth");
      // }
    }
  }, [supabase, username]);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (isMicStarted && !listening) {
      if (transcript.length > 1) {
        handleSpeech();
      }
    }
  }, [isMicStarted, listening, transcript]);

  const handleSpeech = () => {
    setSpeechText(transcript);
    handleSendSpeech();
  };

  const handleSpeechOnPress = () => {
    setIsMicStarted(true);
    setTimeout(() => {
      SpeechRecognition.stopListening();
    }, 5000);
  };

  const handleSendSpeech = async () => {
    setIsLoading(true);

    try {
      // Send a GET request to the API with the text as a parameter
      const response = await fetch(`/api/speech`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: agent.prompt + "\n" + transcript,
          actor: agent.name,
          voice_id: agent.audio_id,
        }),
      });

      if (response.ok) {
        resetTranscript();
        setSpeechText("");
        const audioData = await response.arrayBuffer();
        const audioUrl = URL.createObjectURL(new Blob([audioData]));
        setAudioSrc(audioUrl);
        const audioElement = new Audio(audioUrl);
        audioElement.play();
        audioElement.addEventListener("ended", () => {
          setIsLoading(false);
        });

        setIsMicOn(false);
        setIsMicStarted(false);
      } else {
        console.error(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoop = () => {
    SpeechRecognition.startListening();
  };

  const Extention = dynamic(() => import("../../components/Web3"), {
    ssr: false,
  });
  const Wallet = dynamic(() => import("../../components/Wallet"), {
    ssr: false,
  });

  return (
    <>
      <Meta
        title={agent.name}
        description={agent.description}
        ogImgUrl={agent.image_url}
        ogUrl="https://IHaveSpoken.xyz/nft/elon"
      />
      <div className="mt-20 flex h-full flex-col items-center ">
        <div className="group relative">
          <div
            className={`absolute -inset-1 ${
              isLoading ? "animate-spin" : ""
            }   opacity-100  blur-3xl`}
          >
            <img
              src={agent.image_url}
              alt="Elon"
              className="w-80  rounded-full object-cover"
              width={512}
              height={512}
            />
          </div>
          <div className="items-top relative flex justify-start leading-none ring-1 ring-gray-900/5">
            <div className="flex items-center justify-center ">
              <img
                src={agent.image_url}
                alt="Elon"
                className="w-80 rounded-full object-cover"
                width={512}
                height={512}
              />
            </div>
          </div>
        </div>

        <h3 className="mt-4 text-xl font-semibold">{agent.name}</h3>

        {/* <p>Microphone: {listening ? "on" : "off"}</p>
        <p>Loading: {isLoading ? "true" : "false"}</p> */}
        <div className="mt-10">
          <div
            className={`relative m-5 cursor-pointer transition-all duration-200 ease-out `}
            onClick={() => {
              SpeechRecognition.startListening();
              handleSpeechOnPress();
            }}
          >
            <div
              className={`absolute  ${
                listening ? "-inset-5 animate-spin" : " -inset-1"
              }  rounded-full bg-gradient-to-r from-yellow-400 via-gray-50 to-teal-300 p-4 blur-xl transition-all  duration-200 ease-out`}
            >
              <Image src={Mic} alt="mic" width={40} height={40} />
            </div>
            <div
              className={`${
                listening ? "opacity-60" : "opacity-100"
              } relative rounded-full bg-neutral-50 p-4 transition-all duration-200 ease-out`}
            >
              <Image src={Mic} alt="mic" width={40} height={40} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;

export const getServerSideProps = async ({ req }) => {
  const { url = "" } = req;
  const urlSlug = url.split("nft/")[1];
  console.log(urlSlug);

  const { data, error } = await supabase
    .from("agents")
    .select("*")
    .eq("username", urlSlug);

  if (error) {
    console.error("Error fetching agents:", error.message);
    return;
  }
  console.log("gello");

  return { props: { agent: data[0] } };
};
