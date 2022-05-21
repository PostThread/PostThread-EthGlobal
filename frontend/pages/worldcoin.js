import React from 'react'
import { useMoralis } from "react-moralis";
import { WorldIDComponent } from "../components/WorldId";
import { Button } from 'web3uikit';
import { user_contract } from '../constants/contract_addresses';
import { user_abi } from '../constants/user_abi';
import { defaultAbiCoder as abi } from "@ethersproject/abi";


export default function WorldCoin() {

  const { account } = useMoralis()
  const [worldIDProof, setWorldIDProof] = useState()
  let web3 = new Web3(Web3.givenProvider)

  const claimAction = async () => {
    if (!worldIDProof) {
      throw "World ID proof is missing.";
    }

    const { runContractFunction: claim } = useWeb3Contract({
      abi: user_contract,
      contractAddress: user_abi,
      functionName: "claim",
      params: {
        receiver: account,
        root: worldIDProof.merkleRoot,
        nullifierHash: worldIDProof.nullifierHash,
        proof: abi.decode(["uint256[8]"], worldIDProof.proof)[0]
      },
    })

    const claimResult = await claim()
    console.log("Claimed!", claimResult);
  };

  return (
    <div>
      {typeof window !== 'undefined' &&
        <>
          <WorldIDComponent
            signal={account}
            setProof={(proof) => setWorldIDProof(proof)}
          />
          <Button
            type="button"
            disabled={!worldIDProof}
            onClick={async () => await claimAction()}
            text="Claim"
          >
          </Button>
        </>}
    </div>
  )
}
