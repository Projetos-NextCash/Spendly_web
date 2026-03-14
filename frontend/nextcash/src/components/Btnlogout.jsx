import React from 'react'
import { useNavigate } from 'react-router-dom';

const Btnlogout = ({ className }) => {
 const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("usuarioId");

    navigate("/login");
  };

  return (
    <button className={className} onClick={handleLogout}>
      Sair
    </button>
  );
};

export default Btnlogout