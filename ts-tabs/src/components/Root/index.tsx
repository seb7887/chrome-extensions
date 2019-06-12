import styled, { keyframes } from 'styled-components';
import { Theme } from '../../types/Theme';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Root = styled.div`
  animation: ${fadeIn} 0.1s ease-in-out both;
  text-align: center;
  transition: all 0.6s ease-in-out both;
  height: 100%;
  min-height: 100vh;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    will-change: transform;
    z-index: -1;
    background: ${(props: { theme: Theme }) => props.theme.appBackground};
  }
`;

export const Main = styled.div`
  animation: ${fadeIn} 0.2s ease-in-out both;
  animation-delay: 0.1s;
  padding: 0 40px;
  display: flex;
  justify-content: center;
`;
