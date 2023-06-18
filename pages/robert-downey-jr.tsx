import { useEffect, useState } from "react";
import Elon from "../public/robert.png";
import Mic from "../public/microphone-svgrepo-com.svg";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Image from "next/image";
import { useRouter } from "next/router";
import useUser from "../utils/store/useUser";

const IndexPage = () => {
  const [audioSrc, setAudioSrc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [speechText, setSpeechText] = useState("");

  const [isMicOn, setIsMicOn] = useState(false);
  const [isMicStarted, setIsMicStarted] = useState(false);

  const router = useRouter();
  const { user, isUserReady } = useUser();

  useEffect(() => {
    if (isUserReady) {
      if (user === null) {
        router.push("/auth");
      }
    }
  }, [user, isUserReady]);

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
  };

  const handleSendSpeech = async () => {
    setIsLoading(true);

    try {
      // Send a GET request to the API with the text as a parameter
      const response = await fetch(`/api/speech`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: transcript }),
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

  return (
    <div className="mt-20 flex h-full flex-col items-center ">
      <div className="group relative">
        <div
          className={`absolute -inset-1 ${
            isLoading ? "animate-spin" : ""
          }   opacity-100  blur-3xl`}
        >
          <Image
            src={Elon}
            alt="Elon"
            className="w-80  rounded-full object-cover"
            width={512}
            height={512}
          />
        </div>
        <div className="items-top relative flex justify-start leading-none ring-1 ring-gray-900/5">
          <div className="flex items-center justify-center ">
            <Image
              src={Elon}
              alt="Elon"
              className="w-80 rounded-full object-cover"
              width={512}
              height={512}
            />
          </div>
        </div>
      </div>

      <h3 className="mt-4 text-xl font-semibold">Robert Downey Jr</h3>

      {/* <p>Microphone: {listening ? "on" : "off"}</p>
        <p>Loading: {isLoading ? "true" : "false"}</p> */}
      <div className="absolute bottom-32 md:bottom-10">
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
            className={`relative rounded-full bg-neutral-50 p-4 opacity-100 transition-all duration-200 ease-out ${
              listening ? "opacity-0" : ""
            }`}
          >
            <Image src={Mic} alt="mic" width={40} height={40} />
          </div>
        </div>
      </div>

      {/* <div className="flex">
          <button
            className="btn bg-white normal-case text-black hover:bg-white"
            onClick={() => SpeechRecognition.startListening()}
          >
            Start
          </button>
          <button
            className="btn bg-white normal-case text-black hover:bg-white"
            onClick={SpeechRecognition.stopListening}
            >
            Stop
          </button>
          <button
            className="btn bg-white normal-case text-black hover:bg-white"
            onClick={resetTranscript}
          >
            Reset
          </button>
          <button
            className="btn bg-white normal-case text-black hover:bg-white"
            onClick={handleSpeech}
          >
            Send
          </button>
        </div> */}
      {/* <p>{transcript}</p>
        <button
          className="btn absolute bottom-0 w-full max-w-md bg-white normal-case text-black hover:bg-white"
          onClick={() => {
            SpeechRecognition.stopListening();
            resetTranscript();
          }}
        >
          Reset
        </button> */}
      {/* {audioSrc && <audio src={audioSrc} controls />} */}
    </div>
  );
};

export default IndexPage;
