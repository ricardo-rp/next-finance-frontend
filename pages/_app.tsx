import { AppPropsWithLayout } from "../lib/types/layouts";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const layout = Component.layout ?? ((page) => page);

  return layout(<Component {...pageProps} />);
}

export default MyApp;
