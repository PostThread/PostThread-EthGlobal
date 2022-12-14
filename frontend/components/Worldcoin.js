import React, { useEffect, useState } from 'react'
import { useMoralis } from "react-moralis";
import WorldIDComponent from '../components/WorldIdComponent';
import { Button } from 'web3uikit';
import { user_contract } from '../constants/contract_addresses';
import { user_abi } from '../constants/user_abi';
import { defaultAbiCoder as abi } from "@ethersproject/abi";
import styles from '../styles/Home.module.css'
import { useWeb3Contract } from 'react-moralis';
import { useCallback } from 'react';
import Moralis from 'moralis'

export default function WorldCoin() {


  const { account } = useMoralis()
  const [worldIDProof, setWorldIDProof] = useState()
  const [root, setRoot] = useState()
  const [proof, setProof] = useState()
  const [nullifierHash, setNullifierHash] = useState()
  let options = {}

  useEffect(() => {
    console.log("Proof " + JSON.stringify(worldIDProof))
    options = {
      abi: user_abi,
      contractAddress: user_contract,
      functionName: "claim",
      params: {
        receiver: account,
        root: root,
        nullifierHash: nullifierHash,
        proof: proof,
      },
    }
  }, [worldIDProof])



  // const { runContractFunction: claim, error: errorOnClaim } = useWeb3Contract({
  //   abi: user_contract,
  //   contractAddress: user_abi,
  //   functionName: "claim",
  //   params: {
  //     receiver: account,
  //     root: root,
  //     nullifierHash: nullifierHash,
  //     proof: proof
  //   },
  // })

  return (
    <div className={styles.worldcoin}>
      <WorldIDComponent
        signal={account}
        setProof={(worldProof) => {
          setWorldIDProof(worldProof)
          setRoot(worldProof.merkleRoot)
          setNullifierHash(worldProof.nullifierHash)
          setProof(abi.decode(["uint256[8]"], worldProof.proof)[0])
        }}
      />
      <Button
        type="button"
        size='large'
        disabled={!worldIDProof}
        onClick={async () => {

          // const claimResult = Moralis.executeFunction(options);
          // // const claimResult = await claim({ onError: (e) => console.log(e) })
          // // if (errorOnClaim) { console.log(errorOnClaim) }
          // console.log("Claimed!", claimResult);
        }}
        text="Get verified!"
      >
      </Button>
    </div>
  )
}
