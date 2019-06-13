// createAction(type, actionCallback => { return (arg1, ...) => actionCallback(payload?, meta?)})
import { createAction } from 'typesafe-actions';
import { Bookmark } from '../types/Bookmark';
import { ChromeBookmark } from '../types/ChromeBookmark';
import { ReduxPersistedState } from '../types/ReduxPersistedState';

// Session Actions
const setQuery = createAction('session/SET_QUERY', resolve => {
  return (query: string) => resolve(query);
});

const toggleShowHiddenBookmarks = createAction(
  'session/TOGGLE_SHOW_HIDDEN_BOOKMARKS',
  resolve => {
    return () => resolve();
  }
);

// Bookmark Actions
const retrieveBookmarks = createAction(
  'bookmark/RETRIEVE_BOOKMARKS',
  resolve => {
    return () => resolve();
  }
);

const retrieveBookmarksSuccess = createAction(
  'bookmark/RETRIEVE_BOOKMARK_SUCCESS',
  resolve => {
    return (
      foldersById: { [id: string]: ChromeBookmark },
      bookmarksById: { [id: string]: ChromeBookmark }
    ) => resolve({ foldersById, bookmarksById });
  }
);

const moveBookmark = createAction('bookmark/MOVE_BOOKMARK', resolve => {
  return (bookmark: Bookmark, oldIndex: number, newIndex: number) =>
    resolve({ bookmark, oldIndex, newIndex });
});

const moveBookmarkSuccess = createAction(
  'bookmark/MOVE_BOOKMARK_SUCCESS',
  resolve => {
    return () => resolve();
  }
);

const hideFolder = createAction('bookmark/HIDE_FOLDER', resolve => {
  return (bookmarkId: string) => resolve(bookmarkId);
});

const showFolder = createAction('bookmark/SHOW_FOLDER', resolve => {
  return (bookmarkId: string) => resolve(bookmarkId);
});

// Theme Actions
const goToNextTheme = createAction('theme/GO_TO_NEXT_THEME', resolve => {
  return () => resolve();
});

// Rehydration Actions
const rehydrate = createAction('other/REHYDRATE_REQUEST', resolve => {
  return () => resolve();
});

const rehydrateSuccess = createAction('other/REHYDRATE_SUCCESS', resolve => {
  return (persistedState: ReduxPersistedState) => resolve(persistedState);
});

const actions = {
  toggleShowHiddenBookmarks,
  setQuery,
  retrieveBookmarks,
  retrieveBookmarksSuccess,
  moveBookmark,
  moveBookmarkSuccess,
  hideFolder,
  showFolder,
  goToNextTheme,
  rehydrate,
  rehydrateSuccess
};

export default actions;
