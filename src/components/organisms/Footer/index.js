import React from 'react';
import styled from 'styled-components';
import logo from '../../../assets/images/footer_logo.svg'

const FooterContainer = styled.footer`
  background-color: #1D284C;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  place-content: flex-end;
  padding: 0 20px;
  color: white;
`;

const FooterText = styled.p`
  text-align: center;
  margin: 0;
  font-size: 16px;
`;

const Logo = styled.img`
  height: 35px;
`;

const Footer = () => {
  return (
    <FooterContainer role="contentinfo" aria-label="Rodapé do site">
      {/* <FooterText aria-label="Desenvolvido por ">Desenvolvido por </FooterText> */}
      <Logo src={logo} alt="Logotipo do site Joguei Troquei" />
    </FooterContainer>
  );
};

export default Footer;
