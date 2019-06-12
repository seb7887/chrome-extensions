import React from 'react';
import styled from 'styled-components';
import { Theme } from '../../types/Theme';
import { useHover } from '../../hooks';
import OptionHideShow from './OptionHideShow';

interface Props {
  title: string;
  isHidden: boolean;
  onOptionClick: () => void;
}

const FolderHeader: React.FC<Props> = ({ title, isHidden, onOptionClick }) => {
  const [rootRef, isHovered] = useHover<HTMLParagraphElement>();

  return (
    <Root ref={rootRef}>
      <Title>{title}</Title>
      {isHovered && (
        <Options>
          <OptionHideShow
            size={24}
            isHidden={isHidden}
            onClick={onOptionClick}
          />
        </Options>
      )}
    </Root>
  );
};

export default FolderHeader;

const Root = styled.div`
  display: inline-flex;
  cursor: pointer;
  align-items: center;
  margin-left: 10px; /* TODO: react-sortable-hoc grid workaround */
`;

const Title = styled.p`
  color: ${(props: { theme: Theme }) => props.theme.folderColor};
  font-size: 19px;
  font-weight: 500;
  display: inline-block;
`;

const Options = styled.div`
  margin-left: 6px;
`;
