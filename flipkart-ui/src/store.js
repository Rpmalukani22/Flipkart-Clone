import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import cartReducer from './features/cart/cartSlice';

// const persistConfig = {
//   key: 'root',
//   storage: window.localStorage,
// };

// const persistedReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: cartReducer,
  preloadedState:loadFromLocalStorage()
});

function saveToLocalStorage(state){

  try{
    const serialState = JSON.stringify(state)
    localStorage.setItem("reduxStore",serialState)
  }catch(e){
    console.warn(e);
  }
}

function loadFromLocalStorage(){

  try{
    const serialisedState = localStorage.getItem("reduxStore");
    if(serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  }catch(e){
    console.warn(e);
    return undefined;
  }
}

store.subscribe(()=>saveToLocalStorage(store.getState()));

export { store };
