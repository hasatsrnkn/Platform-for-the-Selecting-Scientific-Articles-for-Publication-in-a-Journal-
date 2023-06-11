import "bootstrap/dist/css/bootstrap.css";
import SSRProvider from "react-bootstrap/SSRProvider";
import store from "../store";
import { Provider } from "react-redux";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SSRProvider>
        <Component {...pageProps} />
      </SSRProvider>
    </Provider>
  );
}

export default MyApp;
