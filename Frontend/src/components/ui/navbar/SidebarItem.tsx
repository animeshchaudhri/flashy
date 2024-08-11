import React from "react";

interface SidebarItemProps {
  icon: string;
  text: string;
  isActive?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, isActive }) => {
  const activeClass = isActive ? "text-blue-900" : "";
  const fontClass = isActive ? "font-semibold" : "font-medium";

  return (
    <div
      className={`flex gap-3.5 text-xl ${fontClass} whitespace-nowrap ${activeClass}`}
    >
      <img
        loading="lazy"
        src={icon}
        alt=""
        className="object-contain shrink-0 aspect-square w-[34px]"
      />
      <div className="my-auto">{text}</div>
    </div>
  );
};

export default SidebarItem;
