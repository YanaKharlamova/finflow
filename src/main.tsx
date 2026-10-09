import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "src/App";
import { Provider } from "react-redux";

import { store } from "src/app/store";

async function enableMocking() {
  const { worker } = await import("src/mocks/browser");

  return worker.start();
}

const root = createRoot(document.getElementById("root")!);

const renderApp = (startupError = false) => {
  root.render(
    <StrictMode>
      <Provider store={store}>
        <App startupError={startupError} />
      </Provider>
    </StrictMode>,
  );
};

enableMocking()
  .then(() => renderApp())
  .catch(() => renderApp(true));
