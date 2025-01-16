import '../styles/globals.css'
import { SongProvider } from '../contexts/SongContext'

function MyApp({ Component, pageProps }) {
  return (
    <SongProvider>
      <Component {...pageProps} />
    </SongProvider>
  );
}

export default MyApp
