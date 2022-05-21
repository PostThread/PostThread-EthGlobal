import React from "react";
import { Button } from "web3uikit";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

export default function GoToWorldCoin() {
  const router = useRouter();

  function routeToWorldCoin() {
    router.push("/worldcoin");
  }

  return (
    <div className={styles.userDisplay}>
      <Button
        color="white"
        icon="eye"
        id="test-button-primary-icon-only"
        onClick={routeToWorldCoin}
        size="medium"
        type="button"
        text="Verify"
      />
    </div>
  );
}
