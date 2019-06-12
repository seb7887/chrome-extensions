import React, { ChangeEvent, forwardRef } from 'react';
import { Form, StyledSearchIcon, Input } from './style';

interface Props {
  query: string;
  onChange: (query: string) => void;
}

const SearchBar = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { query, onChange } = props;
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Form>
      <StyledSearchIcon />
      <Input
        ref={ref}
        placeholder="Search bookmarks..."
        type="text"
        onChange={handleInputChange}
        value={query}
      />
    </Form>
  );
});

export default SearchBar;
