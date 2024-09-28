import { render, screen, waitFor } from '@testing-library/react';
import Lista from './Lista';
import mockAxios from 'jest-mock-axios';

afterEach(() => {
    mockAxios.reset();
});

describe('Componente Lista', () => {
    test('deve buscar e exibir os dados corretamente', async () => {

        /// Dados para tentar inserir no JSON
        const dadosMock = [
            { curso: 'Medicina', nomeAluno: 'Caio Loureiro', idade: 20 },
            { curso: 'Veterinária', nomeAluno: 'Naomi Alves', idade: 22 },
        ];

        // Data engatilhada no Axios
        mockAxios.get.mockResolvedValueOnce({ data: dadosMock });

        render(<Lista />);

        // Espera que a lista seja renderizada
        await waitFor(() => expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:3001/scripts/dados'));

        expect(screen.getByText('Curso: Medicina')).toBeInTheDocument();
        expect(screen.getByText('Nome do Aluno: Caio Loureiro')).toBeInTheDocument();
        expect(screen.getByText('Idade: 20')).toBeInTheDocument();
        expect(screen.getByText('Curso: Veterinária')).toBeInTheDocument();
        expect(screen.getByText('Nome do Aluno: Naomi Alves')).toBeInTheDocument();
        expect(screen.getByText('Idade: 22')).toBeInTheDocument();
    });

    test('deve exibir mensagem de erro em caso de falha na busca', async () => {
        mockAxios.get.mockRejectedValueOnce(new Error('Erro ao buscar dados'));

        render(<Lista />);

        // Espera que a mensagem de erro seja exibida
        await waitFor(() => expect(screen.getByText('Erro ao buscar dados do servidor.')).toBeInTheDocument());
    });

    test('deve atualizar a lista quando o evento "atualizarLista" é disparado', async () => {
        const dadosMock = [
            { curso: 'Medicina', nomeAluno: 'Caio Loureiro', idade: 20 },
        ];

        mockAxios.get.mockResolvedValueOnce({ data: dadosMock });

        render(<Lista />);

        // Espera que a lista inicial seja renderizada
        await waitFor(() => expect(screen.getByText('Curso: React')).toBeInTheDocument());

        // Atualiza a lista
        const novosDadosMock = [
            { curso: 'Engenharia de Software', nomeAluno: 'Carlos Henrique', idade: 32 },
        ];
        mockAxios.get.mockResolvedValueOnce({ data: novosDadosMock });

        // Dispara o evento "atualizarLista"
        window.dispatchEvent(new Event('atualizarLista'));

        // Espera que os novos dados sejam exibidos
        await waitFor(() => expect(screen.getByText('Curso: Angular')).toBeInTheDocument());
    });
});
