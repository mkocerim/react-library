import React from "react";


import Header from "./components/Header";

import ListBooks from "./components/ListBooks";

import Loading from "./components/Loading";

function App() {
  return (
    <div className="App">
      <Header />
      <ListBooks />
    </div>
  );
}

export default App;
