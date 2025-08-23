import React from "react";

const Footer = () => {
  return (
    <footer className="py-4 text-center text-muted">
      <small>© {new Date().getFullYear()} My Store. All rights reserved.</small>
    </footer>
  );
};

export default Footer;
