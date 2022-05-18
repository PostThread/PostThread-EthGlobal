import '../styles/globals.css'
import { MoralisProvider } from "react-moralis"
import { NotificationProvider } from 'web3uikit';
import { AppWrapper } from '../context/AppContext';


function MyApp({ Component, pageProps }) {
  const appId = process.env.NEXT_PUBLIC_APPID
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL

  return (
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <NotificationProvider>
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </NotificationProvider>
    </MoralisProvider>
  )
}

export default MyApp
