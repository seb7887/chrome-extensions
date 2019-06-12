import React from 'react';
import styled from 'styled-components';
import { Folder } from '../../types/Folder';
import { SortableContainer } from 'react-sortable-hoc';
import BookmarkGridItem from './BookmarkGridItem';

interface Props {
  folder: Folder;
  isDragging: boolean;
  isFolderHidden: boolean;
}

const BookmarkGrid = SortableContainer<Props>(
  ({ folder, isDragging, isFolderHidden }: any) => (
    <Root>
      {folder.bookmarks.map((bookmark: any, index: any) => (
        <BookmarkGridItem
          key={bookmark.id}
          id={bookmark.id}
          index={index}
          title={bookmark.title}
          url={bookmark.url}
          isHoverDisabled={isDragging}
          isTransitionDisabled={isDragging}
          isHidden={isFolderHidden}
        />
      ))}
    </Root>
  )
);

export default BookmarkGrid;

const Root = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, 280px);
  padding-left: 0;
`;
