import React, { useRef, MouseEvent } from 'react';
import { useMappedState } from 'redux-react-hook';
import { ReduxState } from '../../types/ReduxState';
import { useMappedActions, useKeyboardPress } from '../../hooks';
import actions from '../../actions';
import SearchBar from '../SearchBar';
import {
  Root,
  Logo,
  StyledLogoImage,
  LogoText,
  Menu,
  MenuItem,
  ToolTip,
  Separator,
  StyledGithubIcon,
  StyledHideIcon,
  StyledShowIcon,
  StyledColorLensIcon
} from './style';

const mapState = (state: ReduxState) => ({
  query: state.session.query,
  isShowingHiddenBookmarks: state.session.isShowingHiddenBookmarks
});

const Header: React.FC = React.memo(props => {
  const { isShowingHiddenBookmarks, query } = useMappedState(mapState);
  const {
    toggleShowHiddenBookmarks,
    setQuery,
    goToNextTheme
  } = useMappedActions(actions);
  const searchBarRef = useRef<HTMLInputElement>(null);

  useKeyboardPress({
    key: 'f',
    metaKey: true,
    onKeyDown: e => {
      e.preventDefault();
      searchBarRef.current && searchBarRef.current.focus();
    }
  });

  const handleBookmarksVisibilityClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    toggleShowHiddenBookmarks();
  };

  const handleThemeSwitchClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    goToNextTheme();
  };

  return (
    <Root>
      <Logo>
        <StyledLogoImage />
        <LogoText>Another Tab</LogoText>
      </Logo>
      <SearchBar ref={searchBarRef} query={query} onChange={setQuery} />
      <Menu>
        <MenuItem onClick={handleBookmarksVisibilityClick}>
          {isShowingHiddenBookmarks ? <StyledHideIcon /> : <StyledShowIcon />}
          <ToolTip>
            {isShowingHiddenBookmarks
              ? 'Hide hidden bookmarks'
              : 'Show hidden bookmarks'}
          </ToolTip>
        </MenuItem>
        <Separator />
        <MenuItem onClick={handleThemeSwitchClick}>
          <StyledColorLensIcon />
          <ToolTip>Change theme colors</ToolTip>
        </MenuItem>
        <Separator />
        <MenuItem href="https://github.com/seb7887" tabIndex={-1}>
          <StyledGithubIcon />
        </MenuItem>
      </Menu>
    </Root>
  );
});

export default Header;
