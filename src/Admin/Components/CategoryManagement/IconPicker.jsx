import React from "react";
import * as FaIcons from "react-icons/fa";

// Keep only useful 50–70 icons (recommended)
const iconList = [
  "FaBook",
  "FaGraduationCap",
  "FaSchool",
  "FaChalkboardTeacher",
  "FaUniversity",
  "FaPen",
  "FaPencilAlt",
  "FaClipboard",
  "FaLaptopCode",
  "FaCogs",
  "FaTools",
  "FaMicrochip",
  "FaServer",
  "FaCode",
  "FaDraftingCompass",
  "FaRobot",
  "FaBriefcase",
  "FaBuilding",
  "FaHandshake",
  "FaChartLine",
  "FaUserTie",
  "FaFileInvoice",
  "FaBalanceScale",
  "FaRupeeSign", // important for India 🇮🇳
  "FaDollarSign",
  "FaWallet",
  "FaMoneyBill",
  "FaMoneyCheck",
  "FaCoins",
  "FaPiggyBank",
  "FaChartBar",
  "FaChartPie",
  "FaChartArea",
  "FaArrowUp",
  "FaArrowDown",
  "FaExchangeAlt",
  "FaSignal",
];

const IconPicker = ({ selectedIcon, onSelect }) => {
  return (
    <div className="border rounded p-2">
      <p className="mb-2 font-medium">Select Icon</p>

      <div className="grid grid-cols-6 gap-2 max-h-40 overflow-y-auto">
        {iconList.map((iconName) => {
          const Icon = FaIcons[iconName];

          return (
            <div
              key={iconName}
              onClick={() => onSelect(iconName)}
              title={iconName}
              className={`p-2 flex justify-center items-center cursor-pointer border rounded 
              ${selectedIcon === iconName ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
            >
              <Icon size={18} />
            </div>
          );
        })}
      </div>

      {/* Preview */}
      {selectedIcon && FaIcons[selectedIcon] && (
        <div className="mt-3 flex items-center gap-2">
          <span>Selected:</span>
          {React.createElement(FaIcons[selectedIcon], { size: 20 })}
          <span className="text-sm text-gray-600">{selectedIcon}</span>
        </div>
      )}
    </div>
  );
};

export default IconPicker;
