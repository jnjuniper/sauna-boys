import React, { useState } from "react";

const FooterSection = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b sm:border-none">
      <div
        className="py-2 px-2 bg-blue-100 flex justify-between items-center cursor-pointer sm:cursor-default"
        onClick={toggleAccordion}
      >
        <h3 className="font-medium">{title}</h3>

        <span className="sm:hidden">{isOpen ? "▲" : "▼"}</span>
      </div>

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
