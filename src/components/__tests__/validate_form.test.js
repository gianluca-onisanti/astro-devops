import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Formulario from './Formulario';

// Mock da função axios.post
jest.mock('axios');

test('valida os campos obrigatórios e exibe mensagens de erro', async () => {

  // Renderiza o componente
  render(<Formulario />);

  // Simula o envio do formulário sem preencher nenhum campo
  fireEvent.click(screen.getByText('Enviar'));

  // Verifica se a requisição axios.post NÃO foi feita
  expect(axios.post).not.toHaveBeenCalled();

  // Tratamento de Campos Vazios
  expect(screen.getByText('Por favor, preencha este campo.')).toBeInTheDocument(); 
  // ou
  expect(screen.getByLabelText('Curso:').classList.contains('error')).toBe(true); 

  // Preenche apenas alguns campos e tenta enviar novamente
  fireEvent.change(screen.getByLabelText('Curso:'), { target: { value: 'React' } });
  fireEvent.click(screen.getByText('Enviar'));

  // Verifica se a requisição ainda não foi feita
  expect(axios.post).not.toHaveBeenCalled();

});