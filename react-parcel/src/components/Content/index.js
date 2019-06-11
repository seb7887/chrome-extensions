import React from 'react';

const Content = ({ quote, author }) => (
  <>
    <p>{quote}</p>
    <p> - {author} -</p>
  </>
);

export default Content;
