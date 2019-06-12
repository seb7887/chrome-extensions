import styled, { keyframes } from 'styled-components';
import { Theme } from '../../types/Theme';
import LogoImage from '../LogoImage';
import { MarkGithub as GithubIcon } from 'styled-icons/octicons';
import {
  Hide as HideIcon,
  Show as ShowIcon
} from 'styled-icons/boxicons-regular';
import { ColorLens as ColorLensIcon } from 'styled-icons/material';

const fadeInBottom = keyframes`
  from {
    transform: translateY(-40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const Root = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 40px;
  height: 28px;
  background: ${(props: { theme: Theme }) => props.theme.headerBackground};
  animation: ${fadeInBottom} 0.1s ease-in-out both;
  animation-delay: 0.1s;
`;

export const Logo = styled.div`
  display: flex;
  height: 28px;
  flex-direction: row;
  align-items: center;
`;

export const StyledLogoImage = styled(LogoImage)`
  width: 28px;
  height: 28px;
`;

export const LogoText = styled.p`
  color: ${(props: { theme: Theme }) => props.theme.headerColor};
  font-size: 17px;
  font-weight: 600;
  margin-left: 16px;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ToolTip = styled.span`
  visibility: hidden;
  width: 120px;
  text-align: center;
  border-radius: 8px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: 100%;
  color: white;
  background-color: black;
  &::after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent black transparent;
  }
`;

export const MenuItem = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    opacity: 0.7;
    ${ToolTip} {
      visibility: visible;
      opacity: 1;
    }
  }
`;

export const Separator = styled.span`
  background: ${(props: { theme: Theme }) => props.theme.headerColor};
  margin: 0px 16px;
  height: 18px;
  width: 1px;
`;

export const StyledHideIcon = styled(HideIcon)`
  color: ${(props: { theme: Theme }) => props.theme.headerColor};
  height: 22px;
  width: 22px;
  margin-right: 4px;
`;

export const StyledColorLensIcon = styled(ColorLensIcon)`
  color: ${(props: { theme: Theme }) => props.theme.headerColor};
  height: 22px;
  width: 22px;
  margin-right: 4px;
`;

export const StyledShowIcon = styled(ShowIcon)`
  color: ${(props: { theme: Theme }) => props.theme.headerColor};
  height: 22px;
  width: 22px;
  margin-right: 4px;
`;

export const StyledGithubIcon = styled(GithubIcon)`
  color: ${(props: { theme: Theme }) => props.theme.headerColor};
  height: 22px;
  width: 22px;
`;
