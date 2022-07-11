import React from 'react';
import Header from './components/Header';
import FilterBox from './components/FilterBox';
import "./styles/global.css";

function App() {
  return (
    <React.Fragment>
      <Header />
      <FilterBox />
    </React.Fragment>
  );
}

export default App;
