import "inter-ui/inter.css";
import "katex/dist/katex.min.css";
import "@styles/one-dark.css";
import "@styles/globals.css";
import { Analytics } from "@vercel/analytics/react";

import { GeistProvider, CssBaseline } from "@geist-ui/core";

const App = ({ Component, pageProps }) => {
  return (
    <GeistProvider>
      <CssBaseline />
      <Component {...pageProps} />
      <Analytics />
    </GeistProvider>
  );
};

export default App;
