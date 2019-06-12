import { BookmarkTree } from '../types/BookmarkTree';
import { ReduxState } from '../types/ReduxState';
import compareIndexes from '../utils/compareIndexes';
import { getIsFolderHidden } from './getIsFolderHidden';

export const getBookmarkTree = (state: ReduxState): BookmarkTree => {
  const { foldersById, bookmarksById } = state.bookmarks;
  const { query, isShowingHiddenBookmarks } = state.session;
  const folders: BookmarkTree = Object.keys(foldersById)
    .map(folderId => ({
      ...foldersById[folderId],
      isHidden: getIsFolderHidden(state, folderId),
      bookmarks: []
    }))
    .filter(x => isShowingHiddenBookmarks || !x.isHidden)
    .sort(compareIndexes);
  Object.keys(bookmarksById).forEach(bookmarkId => {
    const bookmark = bookmarksById[bookmarkId];
    const isTitleInQuery = bookmark.title
      .toLowerCase()
      .includes(query.toLowerCase());
    const isUrlInQuery = (bookmark.url || '')
      .toLowerCase()
      .includes(query.toLowerCase());
    const isVisible = isTitleInQuery || isUrlInQuery;
    if (isVisible) {
      const folderIndex = folders.findIndex(
        folder => folder.id === bookmark.parentId
      );
      if (folderIndex > -1) {
        folders[folderIndex].bookmarks.push(bookmark);
      } else {
        folders[folderIndex].bookmarks = [bookmark];
      }
    }
  });
  // Remove the empty folders
  const bookmarkTree = folders.filter(folder => {
    return folder.bookmarks && folder.bookmarks.length > 0;
  });
  // Sort the folders bookmarks (like in the Chrome bookmarks)
  bookmarkTree.forEach(folder => {
    folder.bookmarks.sort(compareIndexes);
  });
  return bookmarkTree;
};
