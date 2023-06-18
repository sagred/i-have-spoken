import dynamic from "next/dynamic";

const Extention = dynamic(() => import("../components/Web3"), {
  ssr: false,
});
const Wallet = dynamic(() => import("../components/Wallet"), {
  ssr: false,
});

const CreatePage = dynamic(() => import("../components/pages/CreatePage"), {
  ssr: false,
});

const Create = () => {
  return (
    <>
      <Extention>
        <Wallet />
        <CreatePage />
      </Extention>
    </>
  );
};

export default Create;
