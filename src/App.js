import * as React from 'react';
import './styles/App.scss';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './routes/Home';
import Stores from './routes/Stores';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './services/store/reducer';

const store = createStore(reducer)

function App() {

  return (
    <Provider store = {store}>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/stores' element={<Stores/>} />
          <Route path='*'  element={<Navigate replace to="/" />} />
        </Routes>
      </HashRouter>
    </Provider>       
  );
}

export default App;