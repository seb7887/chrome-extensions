import styled, { keyframes } from 'styled-components';
import { Theme } from '../../types/Theme';

const fadeInTop = keyframes`
  from { 
    transform: translateY(20px); 
    opacity: 0;
  }
  to { 
    transform: translateY(0); 
    opacity: 1; 
  }
`;

export const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 100vh;
`;

export const Message = styled.p`
  color: ${(props: { theme: Theme }) => props.theme.noResultColor};
  font-size: x-large;
  font-weight: 500;
  animation: ${fadeInTop} 0.4s ease-in-out both;
`;
