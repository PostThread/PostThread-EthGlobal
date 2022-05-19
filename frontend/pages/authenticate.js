import React from 'react'
import { useMoralis } from 'react-moralis';
import { ConnectButton } from 'web3uikit';

export default function Authenticate() {

    const { account } = useMoralis()

    const loadWorldId = () => {
        worldID.init("world-id-container", {
            enableTelemetry: true,
            actionId: contract_address, // <- use the address of your smart contract
            signal: account, // <- Fill in with the user's wallet address here
        })
    };

    return (
        <>
            <ConnectButton />
            <div id="world-id-container">World</div>
            <button onClick={loadWorldId()}>World Coin fire</button>
        </>
    )
}
