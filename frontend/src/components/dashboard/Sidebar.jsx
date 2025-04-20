import { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaHome,
  FaUserCog,
  FaUsers,
  FaCog,
  FaBell,
} from "react-icons/fa";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState("Home");

  const navItems = [
    { name: "Home", icon: <FaHome /> },
    { name: "Templates", icon: <BsFillFileEarmarkTextFill /> },
    { name: "Customers", icon: <FaUsers /> },
    { name: "Employees", icon: <FaUserCog /> },
    { name: "My Business Settings", icon: <FaCog /> },
  ];

  return (
    <div
      className={`bg-gray-800 text-white h-screen p-4 flex flex-col justify-between transition-all duration-300 ${open ? "w-64" : "w-20"
        } relative`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="absolute top-1/2 right-[-12px] transform -translate-y-1/2 bg-gray-800 border border-gray-700 rounded-full p-1"
      >
        {open ? <FaChevronLeft /> : <FaChevronRight />}
      </button>
      <div>
        <h2
          className={`text-lg font-bold mb-6 transition-opacity ${open ? "opacity-100" : "opacity-0 hidden"
            }`}
        >
          CRM
        </h2>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`flex items-center gap-3 text-sm cursor-pointer rounded-md px-2 py-2 transition 
                ${active === item.name
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700 hover:text-white text-gray-300"
                }`}
            >
              {item.icon}
              <span className={`${open ? "block" : "hidden"}`}>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 text-sm cursor-pointer hover:text-gray-300">
          <FaBell />
          <span className={`${open ? "block" : "hidden"}`}>Notifications</span>
        </div>
        <div className="border-t border-gray-600 my-2" />
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40?img=10"
            className="rounded-full w-8 h-8"
            alt="Profile"
          />
          <div className={`${open ? "block" : "hidden"}`}>
            <p className="text-sm">Deep Kumar</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
