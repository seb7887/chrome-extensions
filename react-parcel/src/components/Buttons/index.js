import React from 'react';

const Buttons = ({ click }) => (
  <div className="flex-container">
    <a className="btn" onClick={() => click('inspire')}>
      Inspire
    </a>
    <a className="btn" onClick={() => click('students')}>
      Students
    </a>
    <a className="btn" onClick={() => click('life')}>
      Life
    </a>
    <a className="btn" onClick={() => click('management')}>
      Manage
    </a>
  </div>
);

export default Buttons;
