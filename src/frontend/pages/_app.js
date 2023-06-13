import "bootstrap/dist/css/bootstrap.css";
import SSRProvider from "react-bootstrap/SSRProvider";
import store from "../store";
import { Provider } from "react-redux";
import AutoLogoutHandler from "../autologout";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AutoLogoutHandler>
        <SSRProvider>
          <Component {...pageProps} />
        </SSRProvider>
      </AutoLogoutHandler>
    </Provider>
  );
}

export default MyApp;
