import { ThemeProvider } from "@/contexts/ThemeContext";
import "@/styles/globals.css";
import { CssBaseline, GeistProvider } from "@geist-ui/core";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <GeistProvider>
      <CssBaseline />
      <SessionProvider session={session}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </GeistProvider>
  );
}