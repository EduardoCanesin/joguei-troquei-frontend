import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

// Criar um botão estilizado usando styled-components
const StyledButton = styled(Button)`
  background-color: #FFBB00;
  border-color: #FFBB00;
  color: white;

  &:hover, &:focus {
    background-color: #e0a600;
    border-color: #e0a600;
  }
`;

// Componente reutilizável
const CustomButton = ({ text, ...props }) => {
  return (
    <StyledButton {...props}>
      {text}
    </StyledButton>
  );
};

export default CustomButton;
