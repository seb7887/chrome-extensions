import { produce } from 'immer';
import { getType } from 'typesafe-actions';
import actions from '../actions';
import { ReduxAction } from '../types/ReduxAction';
import theme from '../config/theme';

export type State = {
  availableThemes: typeof theme;
  currentThemeId: string;
};

export const initialState: State = {
  availableThemes: theme,
  currentThemeId: 'deepBlue'
};

export const themesReducer = (
  state: State = initialState,
  action: ReduxAction
) => {
  return produce(state, draft => {
    switch (action.type) {
      case getType(actions.rehydrateSuccess): {
        const persistedState = action.payload;
        if (persistedState.themes) {
          return {
            ...initialState,
            currentThemeId: persistedState.themes.currentThemeId
          };
        }
        break;
      }
      case getType(actions.goToNextTheme): {
        const availableThemeIds = Object.keys(state.availableThemes);
        const currentThemeIndex = availableThemeIds.indexOf(
          state.currentThemeId
        );
        const nextThemeIndex =
          currentThemeIndex >= availableThemeIds.length - 1
            ? 0
            : currentThemeIndex + 1;
        const nextThemeId = availableThemeIds[nextThemeIndex];
        state.currentThemeId = nextThemeId;
        break;
      }
      default:
        return state;
    }
  });
};
