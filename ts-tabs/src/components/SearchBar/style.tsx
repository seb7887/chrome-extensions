import styled from 'styled-components';
import { Search as SearchIcon } from 'styled-icons/material';
import { Theme } from '../../types/Theme';

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 190px;
  height: 32px;
`;

export const StyledSearchIcon = styled(SearchIcon)`
  color: ${(props: { theme: Theme }) => props.theme.headerColor};
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.6s ease-out;
  color: ${(props: { theme: Theme }) => props.theme.headerColor};
  background-color: transparent;
  border: none;
  outline: 0;
  &:hover:focus {
    outline: 0;
    border: none;
  }
  &:focus {
    border: none;
    border-bottom: 1px solid white;
    border-bottom-color: ${(props: { theme: Theme }) =>
      props.theme.headerColor};
  }
  &:hover::placeholder {
  }
  &::placeholder {
    color: ${(props: { theme: Theme }) => props.theme.headerColor};
    opacity: 0.6;
  }
`;
