import React, { useState } from "react";

// FooterSection Component - Renders accordion on mobile and regular section on larger screens
const FooterSection = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b sm:border-none">
      {/* Header - clickable on mobile only */}
      <div
        className="py-2 px-2 bg-blue-100 sm:bg-transparent flex justify-between items-center cursor-pointer sm:cursor-default"
        onClick={toggleAccordion}
      >
        <h3 className="font-medium">{title}</h3>
        {/* Arrow icon only shows on small screens */}
        <span className="sm:hidden">{isOpen ? "▲" : "▼"}</span>
      </div>

      {/* Links - accordion on mobile, always visible on larger screens */}
      <div className={`${!isOpen && "hidden"} sm:block`}>
        <ul className="py-2 text-left">
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

// Main Footer Component
const ResponsiveFooter = () => {
  // Footer data structure
  const footerData = [
    {
      title: "Shopping",
      links: ["Bastuinredning", "Bastuoljor", "Infrabastu", "Bastutillbehör"],
    },
    {
      title: "Mina Sidor",
      links: ["Mina Ordrar", "Mitt Konto"],
    },
    {
      title: "Kundtjänst",
      links: ["Returpolicy", "Integritetspoilcy"],
    },
  ];

  return (
    <footer className="border max-w-full sm:bg-gray-100 mt-8">
      {/* Responsive layout */}
      <div className="sm:flex sm:justify-start sm:px-4 lg:px-8">
        {footerData.map((section, index) => (
          <FooterSection
            key={index}
            title={section.title}
            links={section.links}
          />
        ))}
      </div>

      {/* Footer copyright */}
      <div className="p-2 text-center text-xs flex justify-center items-center">
        <span>© Sauna Boys</span>
      </div>
    </footer>
  );
};

export default ResponsiveFooter;
