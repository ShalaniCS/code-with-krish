import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Customers from './pages/Customers';
import Products from './pages/Products';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/customers" element={<Customers/>}></Route>
          <Route path="/products" element={<Products/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
