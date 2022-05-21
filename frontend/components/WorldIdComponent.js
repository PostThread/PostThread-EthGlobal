import { defaultAbiCoder as abi } from "@ethersproject/abi";
import { keccak256 } from "@ethersproject/solidity";
import worldID from "@worldcoin/id";
import React from "react";
// import { CONTRACT_ADDRESS } from "./const";

const hashBytes = (input) => {
  return abi.encode(
    ["uint256"],
    [BigInt(keccak256(["bytes"], [input])) >> BigInt(8)]
  );
};

export const WorldIDComponent = ({ signal, setProof }) => {
  const enableWorldID = async () => {
    try {
      const result = await worldID.enable();
      setProof(result);
      console.log("World ID verified successfully: ", result);
    } catch (error) {
      console.error(error);
      enableWorldID().catch(console.error.bind(console));
    }
  };
  React.useEffect(() => {
    if (!worldID.isInitialized()) {
      worldID.init("world-id-container", {
        actionId: hashBytes("0x330C8452C879506f313D1565702560435b0fee4C"),
        signal,
      });
    }
    if (!worldID.isEnabled()) {
      enableWorldID().catch(console.error.bind(console));
    }
  }, []);
  return <div id="world-id-container" />;
};
