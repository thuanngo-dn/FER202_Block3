import React from "react";

function Footer() {
  return React.createElement(
    "footer",
    { className: "bg-dark text-light py-3 mt-4" },
    React.createElement(
      "div",
      { className: "container text-center small" },
      "© ", new Date().getFullYear(), " Student App. All rights reserved."
    )
  );
}

export default Footer;
