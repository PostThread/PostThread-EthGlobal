import React from 'react'

export default function Authenticate() {

    const loadWorldId = () => {
        worldID.init("world-id-container", {
            enableTelemetry: true,
            actionId: "0x330C8452C879506f313D1565702560435b0fee4C", // <- use the address of your smart contract
            signal: userWalletAddress, // <- Fill in with the user's wallet address here
        })
    };

    return (
        <div id="world-id-container">World</div>
    )
}
