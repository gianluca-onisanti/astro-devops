const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3001; // Use uma porta diferente da porta padrão do Astro

app.use(cors());
app.use(bodyParser.json());

// Rota para receber dados do formulário
app.post('/scripts/salvar', (req, res) => {
  const formData = req.body;

  fs.readFile('formData.json', 'utf8', (err, data) => {
    if (err) {
      // Se o arquivo não existir, crie um novo array com os dados
      if (err.code === 'ENOENT') {
        const newData = [formData];
        fs.writeFile('formData.json', JSON.stringify(newData), (writeErr) => {
          if (writeErr) {
            console.error('Erro ao criar e salvar os dados:', writeErr);
            res.status(500).send('Erro ao salvar os dados');
          } else {
            console.log('Novo arquivo criado e dados salvos com sucesso!');
            res.send('Dados recebidos com sucesso!');
          }
        });
      } else {
        // Outro erro ao ler o arquivo
        console.error('Erro ao ler o arquivo:', err);
        res.status(500).send('Erro ao salvar os dados');
      }
    } else {
      try {
        const existingData = JSON.parse(data);

        // Certifique-se de que existingData é um array antes de adicionar novos dados
        if (Array.isArray(existingData)) {
          existingData.push(formData); 
          fs.writeFile('formData.json', JSON.stringify(existingData), (writeErr) => {
            if (writeErr) {
              console.error('Erro ao adicionar e salvar os dados:', writeErr);
              res.status(500).send('Erro ao salvar os dados');
            } else {
              console.log('Dados adicionados e salvos com sucesso!');
              res.send('Dados recebidos com sucesso!');
            }
          });
        } else {
          res.status(500).send('Dados inválidos no arquivo');
        }
      } catch (parseError) {
        console.error('Erro ao analisar o JSON:', parseError);
        res.status(500).send('Erro ao analisar dados');
      }
    }
  });
});

app.get('/scripts/dados', (req, res) => {
  fs.readFile('formData.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err);
      res.status(500).send('Erro ao buscar dados');
    } else {
      try {
        const jsonData = JSON.parse(data);
        console.log(jsonData); // Verifique o formato dos dados aqui

        // Certifique-se de que jsonData é um array antes de enviar
        if (jsonData) {
          res.json(jsonData);
        } else {
          res.status(500).send('Dados inválidos no arquivo');
        }
      } catch (parseError) {
        console.error('Erro ao analisar o JSON:', parseError);
        res.status(500).send('Erro ao analisar dados');
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor backend rodando em http://localhost:${port}`);
});