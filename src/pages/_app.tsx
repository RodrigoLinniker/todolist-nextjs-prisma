import "../styles/global.css";
import { Session } from "next-auth";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <ToastContainer />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
