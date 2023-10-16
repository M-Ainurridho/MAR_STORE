import { createSlice } from "@reduxjs/toolkit";

export const pageReducer = createSlice({
   name: "pages",
   initialState: {
      currentPage: "",
      allPages: ["Home", "Shop", "Brands", "About"],
      links: ["/", "/shop", "/brands", "/about"],
   },
   reducers: {
      onPageChange: (state, action) => {
         state.currentPage = action.payload;
      },
   },
});

export const searchReducer = createSlice({
   name: "search",
   initialState: {
      value: "",
   },
   reducers: {
      inputSearch: (state, action) => {
         state.value = action.payload;
      },
   },
});

export const shopReducer = createSlice({
   name: "shop-menu",
   initialState: {
      category: "",
      sub_category: "",
      cart: [],
   },
   reducers: {
      categoryChange: (state, action) => {
         state.category = action.payload.category;
         state.sub_category = action.payload.sub_category;
      },

      clearCategoryMenu: (state) => {
         state.category = "";
         state.sub_category = "";
      },

      addItemToCart: (state, action) => {
         state.cart = [...state.cart, action.payload];
      },

      overwrite: (state, action) => {
         state.cart = action.payload;
      },
   },
});

export const userReducer = createSlice({
   name: "user",
   initialState: {
      authentication: false,
      data: {},
   },
   reducers: {
      signIn: (state, action) => {
         state.authentication = action.payload.authentication;
         state.data = action.payload.user;
      },

      signOut: (state) => {
         state.authentication = false;
         state.data = {};
      },

      editDataUser: (state, action) => {
         state.data = action.payload;
      },

      defaultImage: (state) => {
         state.data.image = "nophoto.jpg"
      },
   },
});

export const userMenuReducer = createSlice({
   name: "user menu",
   initialState: {
      name: "",
      currentSubmenu: "",
   },

   reducers: {
      newMenu: (state, action) => {
         state.name = action.payload;
      },

      updateMenu: (state, action) => {
         state.name = action.payload;
      },

      deleteMenu: (state) => {
         state.name = "";
      },

      currentSubmenu: (state, action) => {
         state.currentSubmenu = action.payload;
      },
      
      deleteSubmenu: (state) => {
         state.currentSubmenu = "";
      },
   },
});

export const { onPageChange } = pageReducer.actions;
export const { inputSearch } = searchReducer.actions;
export const { categoryChange, clearCategoryMenu, addItemToCart, overwrite } = shopReducer.actions;
export const { signIn, signOut, editDataUser, defaultImage } = userReducer.actions;
export const { newMenu, updateMenu, deleteMenu, currentSubmenu, deleteSubmenu } = userMenuReducer.actions;
