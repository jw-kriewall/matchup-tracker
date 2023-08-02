import { configureStore } from '@reduxjs/toolkit';


const initialState = {
    user: null
}

const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'LOGIN':
        return { ...state, user: action.payload };
      case 'LOGOUT':
        return { ...state, user: null };
      default:
        return state;
    }
  };

export const store = configureStore({
  reducer: {
    userReducer: userReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
