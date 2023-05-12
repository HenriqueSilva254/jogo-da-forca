

/*
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
ReactDOM.render(<Jogo />, document.querySelector('.root'))
*/
import React from 'react';
import ReactDOM from 'react-dom';
import Jogo from './Jogo';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Jogo />
  </React.StrictMode>
);