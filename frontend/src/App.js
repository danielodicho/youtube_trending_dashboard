import logo from './logo.svg';
import './App.css';
import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Search from './component/search/search.js';
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//         <body>
//   {/* <button id="import-button" class="import-button">Import Videos</button>
//   <input type="file" id="file-input"></input>

//   <script src="import.js"></script> */}
// </body>
//       </header>
//     </div>
//   );
// }

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
      </Routes>
    </Router>
  );
}


export default App;
