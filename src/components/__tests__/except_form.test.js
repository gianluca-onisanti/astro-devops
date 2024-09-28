import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Formulario from './Formulario';

jest.mock('axios');

test('trata erros no envio do formulário e exibe mensagem', async () => {

    render(<Formulario />);
  
    // Mock da resposta da requisição axios.post com erro
    axios.post.mockRejectedValueOnce({ response: { data: { error: 'Erro ao salvar dados' } } });
  
    // Simula o envio do formulário
    fireEvent.click(screen.getByText('Enviar'));
  
    // Verifica se a requisição foi feita
    await waitFor(() => expect(axios.post).toHaveBeenCalled());
  
    // Verifica se uma mensagem de erro é exibida ao usuário 
    expect(screen.getByText('Erro ao enviar dados:')).toBeInTheDocument(); 
  
    // Verifica se o evento customizado NÃO foi disparado
    const eventoAtualizarLista = new CustomEvent('atualizarLista');
    expect(window.dispatchEvent).not.toHaveBeenCalledWith(eventoAtualizarLista);
  });