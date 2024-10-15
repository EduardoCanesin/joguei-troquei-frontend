// Banner.js
import React from 'react';
import styled from 'styled-components';

const BannerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  padding: 20px;
  background: ${({ gradient }) => (gradient ? 'linear-gradient(to right, #1D284C 50%, #445EB2 100%)' : '#fff')};
`;

const TextContainer = styled.div`
  flex: 1;
  color: #fff;
  font-size: 2rem;
  text-align: right;
`;

const ImageContainer = styled.img`
  flex: 1;
  max-width: 100%;
`;

const Banner = ({ text, image, gradient }) => {
  return (
    <BannerContainer gradient={gradient}>
      <ImageContainer src={image} alt="Imagem do Banner" />
      <TextContainer>{text}</TextContainer>
    </BannerContainer>
  );
};

export default Banner;
