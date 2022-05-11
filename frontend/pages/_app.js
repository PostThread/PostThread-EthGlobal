import '../styles/globals.css'
import { MoralisProvider } from "react-moralis"
import { NotificationProvider } from 'web3uikit';


function MyApp({ Component, pageProps }) {
  const appId = process.env.NEXT_PUBLIC_APPID
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL


  return (
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <NotificationProvider>
        <Component {...pageProps} />
      </NotificationProvider>
    </MoralisProvider>
  )
}

export default MyApp
