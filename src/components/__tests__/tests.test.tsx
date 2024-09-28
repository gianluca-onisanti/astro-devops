import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Formulario from '../Formulario';
import Lista from '../Lista';
import axios, { type AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('Testes de Formulário', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios as AxiosInstance);
  });

  afterEach(() => {
    mock.restore();
  });

  test('deve renderizar o formulário corretamente', () => {
    render(<Formulario />);
    
    expect(screen.getByLabelText(/curso/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nome do aluno/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/idade/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
  });

  test('deve atualizar o estado ao digitar nos campos', () => {
    render(<Formulario />);

    const cursoInput = screen.getByLabelText(/curso/i);
    const nomeInput = screen.getByLabelText(/nome do aluno/i);
    const idadeInput = screen.getByLabelText(/idade/i);

    fireEvent.change(cursoInput, { target: { value: 'Matemática' } });
    fireEvent.change(nomeInput, { target: { value: 'João' } });
    fireEvent.change(idadeInput, { target: { value: '20' } });

    expect(cursoInput).toHaveValue('Matemática');
    expect(nomeInput).toHaveValue('João');
    expect(idadeInput).toHaveValue(20);
  });

  test('deve enviar os dados corretamente', async () => {
    mock.onPost('http://localhost:3001/scripts/salvar').reply(200, {});

    render(<Formulario />);

    fireEvent.change(screen.getByLabelText(/curso/i), { target: { value: 'História' } });
    fireEvent.change(screen.getByLabelText(/nome do aluno/i), { target: { value: 'Maria' } });
    fireEvent.change(screen.getByLabelText(/idade/i), { target: { value: '22' } });

    fireEvent.click(screen.getByRole('button', { name: /enviar/i }));

    await waitFor(() => {
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].data).toEqual(JSON.stringify({
        curso: 'História',
        nomeAluno: 'Maria',
        idade: '22',
      }));
    });
  });
});

describe('Testes de Lista', () => {
    let mock: MockAdapter;
  
    beforeEach(() => {
      mock = new MockAdapter(axios as AxiosInstance);
    });
  
    afterEach(() => {
      mock.restore();
    });

    test('deve chamar a API corretamente', async () => {
        // Mock da chamada da API
        mock.onGet('http://localhost:3001/scripts/dados').reply(200);

        // Renderiza o componente
        render(<Lista />);

        // Aguarde a chamada da API
        await waitFor(() => {
            // Verifique se a API foi chamada
            expect(mock.history.get.length).toBe(1);
            expect(mock.history.get[0].url).toBe('http://localhost:3001/scripts/dados');
        });
    });

    test('deve exibir mensagem de erro ao falhar ao buscar dados', async () => {
      mock.onGet('http://localhost:3001/scripts/dados').reply(500);
  
      render(<Lista />);
  
      await waitFor(() => {
        expect(screen.getByText(/erro ao buscar dados do servidor/i)).toBeInTheDocument();
      });
    });
  });