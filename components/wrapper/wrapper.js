"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import Nav from '@/components/Nav';

const Wrapper = ({ children }) => {
  return (
    <>
      <Provider store={store}>
        {Nav()}
        {children}
        <ToastContainer />
      </Provider>
    </>
  );
};

export default Wrapper;
