/*global chrome*/
import { Bookmark } from '../types/Bookmark';
import { ChromeBookmark } from '../types/ChromeBookmark';
import { DEV, IS_LIVE_EXAMPLE } from '../config/constants';
import delay from '../utils/delay';
import bookmarksFixture from '../fixtures/bookmarks.json';

export const getBookmarks = async () => {
  if (DEV || IS_LIVE_EXAMPLE) {
    await delay(100);
    return bookmarksFixture;
  } else {
    return new Promise<ChromeBookmark[]>(res => chrome.bookmarks.getTree(res));
  }
};

export const moveBookmark = async (
  bookmark: Bookmark,
  oldIndex: number,
  newIndex: number
) => {
  if (DEV || IS_LIVE_EXAMPLE) {
    return;
  } else {
    return new Promise<ChromeBookmark>(resolve => {
      let fixedNewIndex = newIndex;
      if (oldIndex < newIndex) {
        fixedNewIndex++;
      }
      chrome.bookmarks.move(
        bookmark.id,
        { index: fixedNewIndex, parentId: bookmark.parentId },
        resolve
      );
    });
  }
};
