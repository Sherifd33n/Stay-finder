import { useState } from "react";

interface DropDownProps {
  buttonContent: React.ReactNode;
  menuItems: MenuItem[];
  buttonClassName?: string;
}

interface MenuItem {
  //   icon: LucideIcon;
  label: string;
  action: () => void;
  danger?: boolean;
}

function DropDown({
  buttonContent,
  menuItems,
  buttonClassName = "",
}: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (item: MenuItem) => {
    if (item.action) {
      item.action();
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={
          buttonClassName ||
          " "
        }>
        {buttonContent}
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-10">
          {menuItems.map((item, index) => {
            // const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => handleItemClick(item)}
                className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                  item.danger
                    ? "hover:bg-red-50 text-red-600"
                    : "hover:bg-indigo-50 text-gray-700"
                } ${
                  index < menuItems.length - 1 ? "border-b border-gray-100" : ""
                }`}>
                {/* <Icon size={18} /> */}
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DropDown;
