import React from 'react';
import { GlobalStyles, CssBaseline } from '@mui/material';

const GlobalScrollbarStyles: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          /* Apply styles for Chrome, Edge, Safari */
          '*::-webkit-scrollbar': {
            width: '5px',
          },
          '*::-webkit-scrollbar-thumb': {
            cursor:"pointer",
            borderRadius:"10px",
            backgroundColor: 'rgba(0,0,0,0.3)',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
          },
        }}
      />
    </>
  );
};

export default GlobalScrollbarStyles;
