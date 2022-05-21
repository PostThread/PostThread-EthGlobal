import React from "react";
import { Button } from "web3uikit";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

export default function GoToWorldCoin({ username }) {
  const router = useRouter();

  function routeToUser() {
    if (typeof window !== "undefined") {
      localStorage.setItem("userToDisplay", String(username));
      router.push("/worldcoin");
    }
  }

  return (
    <div className={styles.userDisplay}>
      <Button
        color="white"
        icon="user"
        iconLayout="icon-only"
        id="test-button-primary-icon-only"
        onClick={routeToUser}
        size="medium"
        type="button"
      />
      <p>World Coin!</p>
    </div>
  );
}
