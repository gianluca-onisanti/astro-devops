import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Interface para os dados do formulário
interface FormData {
  curso: string;
  nomeAluno: string;
  idade: number;
}

// Componente funcional Lista
const Lista: React.FC = () => {
  const [dados, setDados] = useState<FormData[]>([]); 
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const response = await axios.get('http://localhost:3001/scripts/dados');
        setDados(response.data);
        setErro(null); 
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setErro('Erro ao buscar dados do servidor.'); 
      }
    };
    buscarDados();

    const handleAtualizarLista = () => {
      buscarDados(); 
    };
    window.addEventListener('atualizarLista', handleAtualizarLista);
  
    // Remover o ouvinte quando o componente for desmontado
    return () => {
      window.removeEventListener('atualizarLista', handleAtualizarLista);
    };

  }, []);

  return (
    <div>
      {erro && <p style={{ color: 'red' }}>{erro}</p>} 
      {!erro && dados ? ( 
        <ul>
          {dados.map((item, index) => (
            <li key={index}>
              <strong>Curso:</strong> {item.curso} <br />
              <strong>Nome do Aluno:</strong> {item.nomeAluno} <br />
              <strong>Idade:</strong> {item.idade}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum dado encontrado.</p> 
      )}
    </div>
  );
};

export default Lista;