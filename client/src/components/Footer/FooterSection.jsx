import React, { useState } from "react";

const FooterSection = ({ title, links }) => {
  // State för att hålla reda på om accordionen är öppen eller stängd
  const [isOpen, setIsOpen] = useState(false);

  // Funktion för att växla accordionens tillstånd
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b sm:border-none">
      {/* Rubrik - klickbar endast på mobil */}
      <div
        className="py-2 px-2 bg-blue-100 flex justify-between items-center cursor-pointer sm:cursor-default"
        onClick={toggleAccordion}
      >
        <h3 className="font-medium">{title}</h3>
        {/* Pilikon visas endast på små skärmar */}
        <span className="sm:hidden">{isOpen ? "▲" : "▼"}</span>
      </div>

      {/* Länkar - accordion på mobil, alltid synliga på större skärmar */}
      <div className={`${!isOpen && "hidden"} sm:block`}>
        <ul className="py-2">
          {links.map((link, index) => (
            <li key={index} className="py-1 px-4 sm:px-2">
              <a href="#" className="hover:underline">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FooterSection;
