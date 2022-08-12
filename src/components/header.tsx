import React from "react";

function Header() {
  return (
    <div>
      <div className="flex justify-between w-full mt-5 shadow-lg rounded-lg bg-white">
        <div className="font-bold text-center px-4 py-2 m-2">
          <h3>Upayments</h3>
        </div>
        <div className="font-bold text-center px-4 py-2 m-2">
          <h3>Register</h3>
        </div>
      </div>
    </div>
  );
}

export default Header;
