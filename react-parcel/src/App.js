import React from 'react';

// Components
import Header from './components/Header';
import Content from './components/Content';
import Buttons from './components/Buttons';

class App extends React.Component {
  state = {
    quote: 'Content',
    author: '',
    category: ''
  };

  componentDidMount() {
    this.getQuote();
  }

  getQuote = async (category = 'inspire') => {
    try {
      const url = `https://quotes.rest/qod.json?category=${category}`;
      const data = await fetch(url).then(res => res.json());
      const content = data.contents.quotes[0];
      const { quote, author } = content;

      this.setState({
        category,
        quote,
        author
      });
    } catch (err) {
      this.setState({ quote: err.message });
    }
  };

  render() {
    const { quote, author, category } = this.state;
    return (
      <>
        <div className="modal-header">
          <Header category={category} />
        </div>
        <div className="modal-content">
          <Content quote={quote} author={author} />
        </div>
        <div className="modal-buttons">
          <Buttons click={this.getQuote} />
        </div>
      </>
    );
  }
}

export default App;
