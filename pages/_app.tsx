import { ReactQueryProvider } from "../lib/services/api/ReactQueryProvider";
import { AppPropsWithLayout } from "../lib/services/types/layouts";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const layout = Component.layout ?? ((page) => page);

  return (
    <ReactQueryProvider>
      {layout(<Component {...pageProps} />)}
    </ReactQueryProvider>
  );
}

export default MyApp;
