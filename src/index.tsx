// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import { BrowserRouter } from 'react-router-dom';
// import reportWebVitals from './reportWebVitals';
// import { AuthProvider } from './context/AuthContext';
// import { ChakraProvider, extendTheme } from '@chakra-ui/react';

// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// const theme = extendTheme({});
// // root.render(
// //   <React.StrictMode>
// //     <BrowserRouter> 
// //       <AuthProvider>  
// //       <App />
// //       </AuthProvider>
// //     </BrowserRouter>
// //   </React.StrictMode>
// // );

// reportWebVitals();

// index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);

