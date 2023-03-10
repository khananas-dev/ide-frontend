import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./common/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StyledToastContainer } from "./components/toast/Toast";
import apiInterceptorSetup from "./common/helpers/api/api-interceptor";
import "flexlayout-react/style/light.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
let persistor = persistStore(store);
apiInterceptorSetup(store);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <SnackbarContainer /> */}
      <StyledToastContainer autoClose={800} hideProgressBar />
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
