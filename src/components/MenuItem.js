import React from "react";

const MenuItem = ({ item, activeSection, onClick, isMobile = false }) => {
  const baseStyles = "focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1d4ed8]";
  
  if (item.type === "link") {
    const isActive = activeSection === item.name.toLowerCase();
    return (
      <button
        type="button"
        onClick={() => onClick(item.name.toLowerCase())}
        className={`
          ${baseStyles}
          relative
          group
          inline-flex
          items-center
          px-3
          py-2
          text-[#bfdbfe]
          rounded-md
          transition-colors
          duration-200
          ${isMobile ? 'w-full text-base justify-start' : 'text-sm sm:text-base'}
          ${isActive
            ? 'text-white bg-[#1e40af]/50'
            : 'hover:text-white hover:bg-[#1e40af]/30'
          }
        `}
        aria-current={isActive ? 'page' : undefined}
      >
        {item.name}
        {!isMobile && isActive && (
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left" />
        )}
      </button>
    );
  }

  // ソーシャルリンクの場合
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        ${baseStyles}
        inline-flex
        items-center
        justify-center
        p-2
        rounded-full
        text-[#bfdbfe]
        hover:text-white
        hover:bg-[#1e40af]/30
        transition-colors
        duration-200
        ${isMobile ? 'text-xl' : 'text-lg sm:text-xl'}
      `}
      aria-label={`${item.name}を開く`}
    >
      <span className="sr-only">{item.name}</span>
      <i className={`${item.iconType} fa-${item.name}`} />
    </a>
  );
};

export default MenuItem;
