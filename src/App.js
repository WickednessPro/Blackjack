// import logo from './logo.svg';
import './App.css';
import Game from './components/Game'
// import React from 'react';

function App() {
  // React.cloneElement(<Card type="hearts" number="A" value="11/1" double={false} />)
  // var udeck = document.getElementById('udeck');
  // var hit = document.getElementById('hit');
  // hit.addEventListener('click', function(e) {
  //   React.cloneElement(<Card type="hearts" number="A" value="11/1" double={false} />)
  // })
  return (
    <div className="App">
      <header className="App-header" />
      <Game />
    </div>
  );
}

export default App;
