

import { useAccount, useReadWasmState, useSendMessage } from "@gear-js/react-hooks";
import { useMetadata, useWasmMetadata } from "./useMetadata";

function useNFTMetadata() {
    return useMetadata("https://gtrvjdtwdfnbjeytdjvv.supabase.co/storage/v1/object/public/sagred/nft.meta.txt")
}

function useNFTState<T>(functionName: string, payload?: any) {
  const { buffer } = useWasmMetadata("https://gtrvjdtwdfnbjeytdjvv.supabase.co/storage/v1/object/public/sagred/nft_state.meta.wasm");

  return useReadWasmState(
    "0x91c7ba3aa9cbceae0fa82a512bbd7f7ad50903c8f45818e80473164e26494ce2",
    buffer,
    functionName,
    payload,
  );
}


function useNFTs() {
  const { state } = useNFTState('all_tokens', null);
  return state;
}

function useOwnerNFTs() {
  const { account } = useAccount();
  const owner = account?.decodedAddress;

  const { state, isStateRead } = useNFTState(
    'tokens_for_owner',
    owner,
  );

  return { ownerNFTs: state, isOwnerNFTsRead: isStateRead };
}

function useApprovedNFTs() {
  const { account } = useAccount();
  const decodedAddress = account?.decodedAddress;

  const { state, isStateRead } = useNFTState(
    'approved_tokens',
    decodedAddress,
  );

  return { approvedNFTs: state, isApprovedNFTsRead: isStateRead };
}

function useSendNFTMessage() {
    const meta = useNFTMetadata()
    return useSendMessage(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`, meta)
}

export {useNFTMetadata, useSendNFTMessage, useApprovedNFTs, useOwnerNFTs, useNFTs}
