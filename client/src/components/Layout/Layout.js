import React from "react";
// importing header
import Header from "./Header";

// importing footer
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div
        className="content container mt-4"
      >
        {children}   
      </div>
      <Footer />
    </>
  );
};

export default Layout;
