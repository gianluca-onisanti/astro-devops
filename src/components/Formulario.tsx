import React, { useState } from 'react';
import axios from 'axios';

interface FormData {
  curso: string;
  nomeAluno: string;
  idade: number;
}

const Formulario: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    curso: '',
    nomeAluno: '',
    idade: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3001/scripts/salvar', formData);
      const eventoAtualizarLista = new CustomEvent('atualizarLista');
      window.dispatchEvent(eventoAtualizarLista);
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      // Lidar com o erro, exibir mensagem para o usuário, etc.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="curso">Curso:</label>
        <input
          type="text"
          id="curso"
          name="curso"
          value={formData.curso}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="nomeAluno">Nome do Aluno:</label>
        <input
          type="text"
          id="nomeAluno"
          name="nomeAluno"
          value={formData.nomeAluno}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="idade">Idade:</label>
        <input
          type="number"
          id="idade"
          name="idade"
          value={formData.idade}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <button type="submit">Enviar</button>
      </div>
    </form>
  );
};

export default Formulario;