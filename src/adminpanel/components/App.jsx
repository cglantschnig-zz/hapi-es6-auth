import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <p>App</p>
        {this.props.children}
      </div>
    );
  }
}

export default App;
