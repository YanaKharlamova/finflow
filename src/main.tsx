import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "src/App";
import { Provider } from "react-redux";

import { store } from "src/app/store";

async function enableMocking() {
  const { worker } = await import("src/mocks/browser");

  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>,
  );
});
