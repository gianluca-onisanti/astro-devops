import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    // Adicione outras configurações de paleta se necessário
  },
  typography: {
    // Defina suas configurações de tipografia aqui
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
  },
  // Você também pode adicionar outros ajustes de estilo aqui
});

export default theme;