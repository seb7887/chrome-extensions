import React, { useState } from 'react';
import { BookmarkTree } from '../../types/BookmarkTree';
import { Folder } from '../../types/Folder';
import actions from '../../actions';
import { useMappedActions } from '../../hooks';
import FolderHeader from './FolderHeader';
import BookmarkGrid from './BookmarkGrid';
import { Root, FolderItem } from './style';

interface Props {
  bookmarkTree: BookmarkTree;
}

const FolderList: React.FC<Props> = React.memo(({ bookmarkTree }) => {
  const [isDragging, setIsDragging] = useState(false);
  const { moveBookmark } = useMappedActions(actions);
  const handleStartDragging = () => {
    setIsDragging(true);
  };
  const handleStopDragging = (
    folder: Folder,
    params: {
      oldIndex: number;
      newIndex: number;
    }
  ) => {
    const bookmark = folder.bookmarks[params.oldIndex];
    moveBookmark(bookmark, params.oldIndex, params.newIndex);
    setIsDragging(false);
  };

  const { hideFolder, showFolder } = useMappedActions(actions);

  return (
    <Root>
      {bookmarkTree.map(folder => {
        const handleOptionClick = () => {
          if (folder.isHidden) {
            showFolder(folder.id);
          } else {
            hideFolder(folder.id);
          }
        };
        return (
          <FolderItem key={folder.id}>
            <FolderHeader
              title={folder.title}
              isHidden={folder.isHidden}
              onOptionClick={handleOptionClick}
            />
            <BookmarkGrid
              folder={folder}
              isFolderHidden={folder.isHidden}
              isDragging={isDragging}
              axis="xy"
              distance={8}
              updateBeforeSortStart={handleStartDragging}
              onSortEnd={params => handleStopDragging(folder, params)}
            />
          </FolderItem>
        );
      })}
    </Root>
  );
});

export default FolderList;
