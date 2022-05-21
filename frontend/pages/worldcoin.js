import { Button } from "web3uikit";
import { CONTRACT_ABI, CONTRACT_ADDRESS, provider } from "@/const";
import { midEllipsis } from "@/utils";
import { WorldIDComponent } from "@/WorldIDComponent";
import { defaultAbiCoder as abi } from "@ethersproject/abi";
import { ethers } from "ethers";
import React from "react";

export const App = React.memo(function App() {
  const [screen, setScreen] = React.useState("initial");
  const [worldIDProof, setWorldIDProof] = React.useState(null);
  const [walletAddress, setWalletAddress] = React.useState("");
  const [txHash, setTxHash] = React.useState(""); // hash of the executed airdrop

  const connectWallet = React.useCallback(async () => {
    try {
      provider
        .enable()
        .then(() => {
          setWalletAddress(provider.accounts[0]);
          setScreen("confirm");
        })
        .catch((error) => console.error(error));
    } catch (err) {
      console.error(err);
    }
  }, [provider]);

  const logout = () => {
    provider?.disconnect().catch(console.error.bind(console));
    window.location.reload();
  };

  const claimAction = async () => {
    if (!worldIDProof) {
      throw "World ID proof is missing.";
    }

    const web3Provider = new ethers.providers.Web3Provider(provider);
    const daiContract = new ethers.Contract(
      "0x330C8452C879506f313D1565702560435b0fee4C",
      CONTRACT_ABI,
      web3Provider.getSigner()
    );

    const claimResult = await daiContract.claim(
      walletAddress,
      worldIDProof.merkleRoot,
      worldIDProof.nullifierHash,
      abi.decode(["uint256[8]"], worldIDProof.proof)[0],
      { gasLimit: 10000000 }
    );
    setTxHash(claimResult.hash);
    console.log("Airdrop claimed successfully!", claimResult);
  };

  const claim = async () => {
    try {
      await claimAction();
      setScreen("congratulations");
    } catch (error) {
      console.error("Error executing transaction:", error);
    }
  };

  return (
    <div className="relative grid h-full w-full content-between bg-0f0b16 px-6 pt-5 xs:px-16 xs:pb-4.5 xs:pt-9">
      <div>
        <header className="flex items-center py-2.5">
          <p
            className="text-20 font-bold text-ffffff xs:text-32"
            style={{ flexGrow: 1 }}
          >
            Mesha
          </p>
          {walletAddress && (
            <div className="font-bold text-ffffff">
              {midEllipsis(walletAddress, 12)}{" "}
              <b>
                -{" "}
                <button className="cursor-pointer font-bold" onClick={logout}>
                  Logout
                </button>
              </b>
            </div>
          )}
        </header>

        {screen !== "congratulations" && (
          <div className="grid justify-items-center gap-y-3 justify-self-center text-ffffff xs:gap-y-4">
            <h1 className="text-16 font-bold xs:text-24">
              BIGGEST AIRDROP IS HERE!
            </h1>

            <div className="mt-2 grid justify-items-center text-48 lg:text-80 xs:mt-0 xs:block">
              <span className="font-black text-df57bc ">Get $50 </span>
              <span className="font-black">in Mesha</span>
            </div>

            <p className="mb-5 text-center text-14 xs:mb-8 xs:text-18">
              Mesha is live and ready to use. Login to claim your tokens for
              free.
            </p>

            {screen === "initial" && (
              <div className="grid justify-items-center gap-y-3 ">
                <Button
                  onClick={connectWallet}
                  type="button"
                  className="bg-df57bc hover:bg-df57bc/70"
                >
                  Connect Wallet to Claim
                </Button>

                <p className="text-14 xs:text-12">
                  To test this flow, connect a wallet on Testnet
                </p>
              </div>
            )}

            {screen === "confirm" && (
              <div className="grid w-full max-w-[254px] gap-y-8">
                {walletAddress && (
                  <WorldIDComponent
                    signal={walletAddress}
                    setProof={(proof) => setWorldIDProof(proof)}
                  />
                )}

                <Button
                  type="button"
                  className="w-full bg-df57bc hover:bg-df57bc/70"
                  disabled={!worldIDProof}
                  onClick={claim}
                >
                  Claim
                </Button>
              </div>
            )}
          </div>
        )}

        {screen === "congratulations" && (
          <div className="grid max-w-[314px] justify-items-center gap-y-3 justify-self-center">
            <h1 className="text-24 font-bold text-ffffff xs:text-30">
              CONGRATULATIONS!
            </h1>
            <p className="text-center text-14 text-ffffff xs:text-18">
              Your tokens have been claimed and they are now available in your
              wallet!
            </p>
            <p className="text-center text-14 text-ffffff xs:text-18">
              Your transaction hash is:{" "}
              <code
                title={txHash}
                style={{ maxWidth: 100, fontFamily: "monospace" }}
              >
                {midEllipsis(txHash, 20)}
              </code>{" "}
              (view on{" "}
              <a
                href={`https://mumbai.polygonscan.com/tx/${txHash}`}
                target="_blank"
                style={{ color: "#df57bc" }}
                rel="noreferrer"
              >
                Polygonscan
              </a>
              )
            </p>
          </div>
        )}
      </div>

      {screen === "initial" && (
        <div>
          <span>
            Mesha is a mock client app to showcase how World ID works.{" "}
          </span>
          <a
            href="/"
            className="underline decoration-1 transition-opacity hover:opacity-80"
          >
            Learn more
          </a>
        </div>
      )}
    </div>
  );
});
