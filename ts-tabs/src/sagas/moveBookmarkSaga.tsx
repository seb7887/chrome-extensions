import { ActionType } from 'typesafe-actions';
import { put } from 'redux-saga/effects';
import { moveBookmark } from '../services/chromeService';
import actions from '../actions';

export const moveBookmarkSaga = function*(
  action: ActionType<typeof actions.moveBookmark>
) {
  const { bookmark, oldIndex, newIndex } = action.payload;
  yield moveBookmark(bookmark, oldIndex, newIndex);
  yield put(actions.moveBookmarkSuccess());
};
