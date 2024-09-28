import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Formulario from './Formulario';

jest.mock('axios');

test('envia o formulário com sucesso e dispara o evento', async () => {
    
  // Renderiza o componente
  render(<Formulario />);

  // Preenche os campos do formulário
  fireEvent.change(screen.getByLabelText('Curso:'), { target: { value: 'Educação Física' } });
  fireEvent.change(screen.getByLabelText('Nome do Aluno:'), { target: { value: 'João Pedro' } });
  fireEvent.change(screen.getByLabelText('Idade:'), { target: { value: '22' } });

  // Mock da resposta da requisição axios.post
  axios.post.mockResolvedValueOnce({ data: { message: 'Dados salvos com sucesso!' } });

  // Simula o envio do formulário
  fireEvent.click(screen.getByText('Enviar'));

  // Verifica se a requisição foi feita com os dados corretos
  await waitFor(() => expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/scripts/salvar', {
    curso: 'React',
    nomeAluno: 'João',
    idade: '25',
  }))

  // Verifica se o evento customizado foi disparado
  const eventoAtualizarLista = new CustomEvent('atualizarLista');
  expect(window.dispatchEvent).toHaveBeenCalledWith(eventoAtualizarLista);
})