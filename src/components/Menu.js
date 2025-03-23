import React, { useState, useRef, useEffect, useCallback } from "react";
import menuIcon from "../assets/icons/three-dots-vertical.svg";
import editIcon from "../assets/icons/pencil.svg";
import addIcon from "../assets/icons/plus.svg";
import deleteIcon from "../assets/icons/trash3.svg";
import userIcon from "../assets/icons/person-circle.svg";

const menuOptions = [
  { label: "Edit Group", icon: editIcon },
  { label: "Create Group", icon: addIcon },
  { label: "Add/Remove Clinician", icon: userIcon },
  { label: "Remove Group", icon: deleteIcon }
];

const Menu = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = (label) => {
    setIsOpen(false);
    onSelect(label);
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="p-2 cursor-pointer bg-none rounded-sm focus:outline-none"
        aria-label="Menu"
      >
        <img src={menuIcon} alt="Menu Icon" />
      </button>
      {isOpen && (
        <div
          className="absolute z-40 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg"
          role="menu"
        >
          <ul className="py-1">
            {menuOptions.map((datum) => (
              <li key={datum.label}>
                <button
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => handleClick(datum.label)}
                  role="menuitem"
                >
                  <img height={20} src={datum.icon} alt={datum.label} />
                  {datum.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;
