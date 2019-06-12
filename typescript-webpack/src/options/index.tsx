import * as React from 'react';

class Options extends React.Component {
  render() {
    return (
      <>
        <label>
          <div>
            <span>Activate for domains</span>
            <span>Github</span>
            <input type="text" id="urls" title="Github URL pattern" />
          </div>
          <div>
            <span>Gitlab</span>
            <input type="text" id="gitlaburls" title="Gitlab URL pattern" />
          </div>
        </label>
        <br></br>
        <span>Show in context</span>
        <span></span>
      </>
    );
  }
}

export default Options;
