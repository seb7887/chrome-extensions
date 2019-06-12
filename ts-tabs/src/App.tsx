import React from 'react';
import { ThemeProvider } from 'styled-components';
import { isEmpty } from 'lodash';
import { useMappedState } from 'redux-react-hook';
import { ReduxState } from './types/ReduxState';
import { useOnMount, useMappedActions } from './hooks';
import { getBookmarkTree, getCurrentTheme } from './selectors';
import actions from './actions';
import Header from './components/Header';
import FolderList from './components/FolderList';
import NoResult from './components/NoResult';
import { Root, Main } from './components/Root';

// Like mapStateToProps with Hooks -> use with useMappedState hook
const mapState = (state: ReduxState) => ({
  bookmarkTree: getBookmarkTree(state),
  areBookmarksReady: state.session.areBookmarksReady,
  currentTheme: getCurrentTheme(state)
});

const App: React.FC = () => {
  const { areBookmarksReady, bookmarkTree, currentTheme } = useMappedState(
    mapState
  );
  const { retrieveBookmarks, rehydrate } = useMappedActions(actions);
  const isBookmarkTreeEmpty = isEmpty(bookmarkTree);

  useOnMount(() => {
    rehydrate();
    retrieveBookmarks();
  });

  if (!areBookmarksReady) {
    return null;
  }

  return (
    <ThemeProvider theme={currentTheme}>
      <Root>
        <Header />
        {!isBookmarkTreeEmpty && (
          <Main>
            <FolderList bookmarkTree={bookmarkTree} />
          </Main>
        )}
        {isBookmarkTreeEmpty && <NoResult />}
      </Root>
    </ThemeProvider>
  );
};

export default App;
