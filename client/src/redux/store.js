import { configureStore } from "@reduxjs/toolkit";
import { pageReducer, searchReducer, shopReducer, userReducer, userMenuReducer, alertReducer } from "./reducers";

export const store = configureStore({
   reducer: {
      pages: pageReducer.reducer,
      search: searchReducer.reducer,
      shop: shopReducer.reducer,
      user: userReducer.reducer,
      userMenu: userMenuReducer.reducer,
      alert: alertReducer.reducer,
   },
});
