import React from 'react'
import { useNavigate } from 'react-router-dom';
import api from "/service/api";

const Deluser = () => {
 const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmar = window.confirm(
      "Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita."
    );

    if (!confirmar) return;
    try {
      const id = localStorage.getItem("usuarioId");
      await api.delete(`/api/usuarios/${id}`);

      alert("Conta deletada com sucesso.");
      localStorage.clear(); 
      navigate("/login");
    } catch (err) {
      console.error("Erro ao deletar conta:", err);
      alert(
        err.response?.data?.mensagem || "Não foi possível deletar a conta no momento."
      );
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      className="delete-btn"
    >
      Excluir minha conta
    </button>
  );
};

export default Deluser