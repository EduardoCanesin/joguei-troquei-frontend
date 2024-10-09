import React from 'react';
import styled from 'styled-components';

// Styled Components para o Footer
const FooterContainer = styled.footer`
  background-color: #1D284C;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  color: white;
`;

const FooterText = styled.p`
  text-align: center;
  margin: 0;
  font-size: 16px;
`;

const Logo = styled.img`
  height: 40px;
`;

const Footer = () => {
  return (
    <FooterContainer role="contentinfo" aria-label="Rodapé do site">
      {/* <FooterText aria-label="Desenvolvido por ">Desenvolvido por </FooterText> */}
      <Logo src="/path/to/logo.png" alt="Logotipo do site Joguei Troquei" />
    </FooterContainer>
  );
};

export default Footer;
