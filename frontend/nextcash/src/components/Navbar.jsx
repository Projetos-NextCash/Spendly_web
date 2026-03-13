import React from "react";

const Navbar = () => {
  return (
    <div>
      <ul>
        <li>
          <a href="/">Pág inicial</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
        <li>
          <a href="/perfil">Perfil</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
