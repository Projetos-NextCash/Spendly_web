import React from 'react'
import { useNavigate } from 'react-router-dom';
//import api from "/service/api";

const Deltransasao = () => {

    const navigate = useNavigate();
    
      const handleDelete = async () => {
        const confirmar = window.confirm(
          "Tem certeza que deseja deletar esta transação? Esta ação não pode ser desfeita."
        );
    
        if (!confirmar) return;
        try {
          //const id = localStorage.getItem("usuarioId");
          //await api.delete(`/api/usuarios/${}`);
    
          alert("Transação deletada com sucesso.");
          localStorage.clear(); 
          navigate("/login");
        } catch (err) {
          console.error("Erro ao deletar transação:", err);
          alert(
            err.response?.data?.mensagem || "Não foi possível deletar a transação no momento."
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
  )
}

export default Deltransasao