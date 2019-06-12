import { all, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import actions from '../actions';
import { retrieveBookmarksSaga } from './retrieveBookmarksSaga';
import { rehydrateSaga } from './rehydrateSaga';
import { persistSaga } from './persistSaga';
import { moveBookmarkSaga } from './moveBookmarkSaga';

const rootSaga = function*() {
  yield all([
    takeEvery(getType(actions.retrieveBookmarks), retrieveBookmarksSaga),
    takeEvery(getType(actions.rehydrate), rehydrateSaga),
    takeEvery(getType(actions.moveBookmark), moveBookmarkSaga),
    takeEvery(
      [
        getType(actions.showFolder),
        getType(actions.hideFolder),
        getType(actions.goToNextTheme),
        getType(actions.retrieveBookmarksSuccess)
      ],
      persistSaga
    )
  ]);
};

export default rootSaga;
