import "./App.css";
import Navbar from "./componentes/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add";
import Order from "./pages/Order/Order";
import List from "./pages/List/List";
import { ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"; 


function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <hr />
      <Routes>
        <Route path="/add" element={<Add />} />
        <Route path="/order" element={<Order />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </>
  );
}

export default App;
