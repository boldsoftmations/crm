import { applyMiddleware, legacy_createStore as createStore } from "redux";
import rootReducer from "../Reducer/RootReducer";
import { persistStore } from "redux-persist";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

const middleware = [thunk];

if (import.meta.env.DEV) {
  const { default: logger } = await import("redux-logger");
  middleware.push(logger);
}
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);
