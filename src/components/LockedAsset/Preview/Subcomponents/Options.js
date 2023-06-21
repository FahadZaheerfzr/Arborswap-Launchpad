import React, { useState } from "react";

export default function Options({
  width,
  height,
  color,
  dark_color,
  edit,
  setEdit,
}) {
  const [open, setOpen] = useState(false);

  const handleDropdownClick = () => {
    setOpen(!open);
  };

  const handleEditClick = () => {
    setEdit(!edit);
    setOpen(false); // Close the dropdown after clicking "Edit"
  };

  return (
    <div
      className={`flex justify-center items-center ${width} ${height} bg-${color} dark:bg-${dark_color} gap-1 cursor-pointer relative`}
      onClick={handleDropdownClick}
    >
      <div className="w-1 h-1 bg-dark-text dark:bg-light-text rounded-full" />
      <div className="w-1 h-1 bg-dark-text dark:bg-light-text rounded-full" />
      <div className="w-1 h-1 bg-dark-text dark:bg-light-text rounded-full" />

      {open && (
        <div className="dropdown absolute top-7 left-0 w-10 h-10 ">
          <div className="dropdown-item dark:bg-white bg-black dark:text-black text-white text-sm rounded-sm text-center hover:bg-[#F2F2F2] hover:text-black dark:hover:bg-black dark:hover:text-white py-2 cursor-pointer"
          onClick={handleEditClick}>
            Edit
          </div>
        </div>
      )}
    </div>
  );
}
