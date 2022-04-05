import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";



export default function Base({ children}) {
  return (
    <React.Fragment>
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  );
}
