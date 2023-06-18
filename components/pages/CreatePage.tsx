import React, { useState } from "react";
import Image from "next/image";
import Elon from "../../public/elon.png";

import Link from "next/link";
import { useAccount } from "@gear-js/react-hooks";
import { useOwnerNFTs, useSendNFTMessage } from "../../hooks/api";

const NftInitialState = {
  title: "",
  description: "",
};

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gtrvjdtwdfnbjeytdjvv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0cnZqZHR3ZGZuYmpleXRkanZ2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MjA0NTU4MSwiZXhwIjoxOTk3NjIxNTgxfQ.ngROr05aRAXWDnPvI3xpvxfBjzLvb36_8TBv6Ouwb2c";
const supabase = createClient(supabaseUrl, supabaseKey);

const CreatePage = () => {
  const [nftForm, setNftForm] = useState(NftInitialState);
  const [image, setImage] = useState<File | null>(null);
  const { title, description } = nftForm;

  const [isLoading, setIsLoading] = useState(false);

  const [avatar, setAvatar] = useState("");

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [descr, setDescr] = useState("");

  const [voice, setVoice] = useState("");
  const [prompt, setPrompt] = useState("");
  const [fee, setFee] = useState("");

  const { ownerNFTs, isOwnerNFTsRead } = useOwnerNFTs();

  console.log(ownerNFTs, isOwnerNFTsRead);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setNftForm({ ...nftForm, [name]: value });
  };

  const { account } = useAccount();
  const sendMessage = useSendNFTMessage();

  console.log(account?.decodedAddress);
  const resetForm = () => {
    setNftForm(NftInitialState);
    setImage(null);
  };

  const createNft = async () => {
    let cid;

    const tokenMetadata = {
      name: "Monkeey",
      description: "hello hello",
      media: "Hello hello",
      reference: "",
    };

    const payload = {
      Mint: {
        to: account?.decodedAddress,
        tokenMetadata,
      },
    };
    sendMessage(payload, {
      onSuccess: () => {
        resetForm();
      },
    });
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    try {
      const { data, error } = await supabase.storage
        .from("sagred") // Replace 'bucket-name' with your Supabase storage bucket name
        .upload(`images/${file.name}`, file, {
          cacheControl: "3600", // Set cache control if needed
          upsert: true, // Set to true if you want to replace an existing file with the same name
        });

      if (error) {
        console.error("Error uploading image:", error.message);
      } else {
        const publicUrl = supabase.storage
          .from("sagred") // Replace 'bucket-name' with your Supabase storage bucket name
          .getPublicUrl(data.path);
        console.log("Image uploaded successfully:", publicUrl.data.publicUrl);
        //@ts-ignore
        setImage(publicUrl.data.publicUrl);
        // Do something with the public URL, such as storing it in a database
      }
    } catch (error) {
      console.error("Error uploading image:", error.message);
    }
  };

  const handleVoiceUpload = async (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("name", "Voice Name");
    formData.append("files", file, "sample.mp3");
    formData.append("description", "Voice Description");
    formData.append("labels", JSON.stringify({ accent: "American" }));

    const response = await fetch("https://api.elevenlabs.io/v1/voices/add", {
      method: "POST",
      headers: {
        accept: "application/json",
        "xi-api-key": "c4c7856fd9bc6cf2809c409e5690e1fc",
      },
      body: formData,
    });

    if (response.ok) {
      // Success: handle the response
      const data = await response.json();
      console.log(data);
      setVoice(data.voice_id);
    } else {
      // Error: handle the error response
      console.error("Error:", response.status);
    }
  };

  const handleCreateNft = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/create-nft`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageURL: image,
          name: name,
          username,
          description: descr,
          voiceURL: voice,
          prompt,
          fee,
          wallet: account?.decodedAddress,
        }),
      });

      if (response.ok) {
        alert("Sucess");
      } else {
        console.error(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }

    createNft();
  };

  return (
    <div className="mt-4 mb-40 flex flex-col ">
      <div className="flex h-full w-full flex-col">
        <h2 className="mt-10 mb-5 text-3xl font-semibold">Create New Agent</h2>
        <h2 className="text-2xl font-semibold">Profile</h2>

        <div className="group relative my-3 w-fit rounded-sm border border-white">
          <div className={`absolute -inset-1 opacity-100  blur-3xl`}>
            <Image
              src={Elon}
              alt="My Image"
              className="w-40 rounded-sm object-cover"
              width={200}
              height={200}
            />
          </div>
          <div className="items-top relative flex justify-start leading-none ring-1 ring-gray-900/5">
            <div className="flex items-center justify-center ">
              <Image
                src={Elon}
                alt="My Image"
                className="w-40 rounded-sm object-cover"
                width={200}
                height={200}
              />
            </div>
          </div>
        </div>
        <input
          className="file-input-bordered file-input-primary file-input file-input-xs w-fit"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <div className="my-3 flex flex-col">
          <label className="text-lg ">Name</label>
          <input
            className="input mt-1 w-full border border-neutral-600"
            placeholder="The Mandalorian"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="my-3 flex flex-col">
          <label className="text-lg ">Username</label>
          <input
            className="input mt-1 w-full border border-neutral-600"
            placeholder="man"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="my-3 flex flex-col">
          <label className="text-lg ">Description</label>
          <textarea
            className="textarea mt-1 w-full border border-neutral-600"
            placeholder="I have spoken..."
            onChange={(e) => setDescr(e.target.value)}
          />
        </div>

        <div className="divider"></div>

        <h2 className="text-2xl font-semibold">Voice</h2>

        <div className="my-3 flex w-full flex-col">
          <label className="text-lg ">Audio</label>
          <input
            type="file"
            className="file-input-bordered file-input-primary file-input mt-1 w-full"
            accept="audio/*"
            onChange={handleVoiceUpload}
          />
        </div>

        <div className="divider"></div>

        <h2 className="text-2xl font-semibold">Soul</h2>

        <div className="my-3 flex w-full flex-col">
          <label className="text-lg ">Prompt</label>
          <textarea
            className="textarea-accent textarea mt-1 w-full border border-neutral-600"
            placeholder="Ex: You're Steve Jobs, the legendary co-founder of Apple, the man who revolutionized the tech industry with his bold vision and relentless pursuit of perfection. You've just unveiled the iPhone, changing the world as we know it. Now, let's step into your reality. Embrace your brilliance, your eccentricity, and your unyielding desire to create something truly extraordinary. Be Steve Jobs, and let's dive into a conversation that will ignite minds and inspire innovation. So, my friend, tell me, what's the next big thing you envision shaking up the world?"
            rows={4}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        <div className="divider"></div>

        <h2 className="text-2xl font-semibold">Crypto</h2>

        <div className="my-3 flex w-full flex-col">
          <label className="text-lg">
            Fee for every 10,000 characters in $DOT
          </label>
          <input
            className="input mt-1 w-full border border-neutral-600"
            placeholder="0.100"
            defaultValue={10.0}
            onChange={(e) => setFee(e.target.value)}
          />
        </div>

        <button
          onClick={handleCreateNft}
          className="btn-lg btn my-6 bg-indigo-600 normal-case"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreatePage;
