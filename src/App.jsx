import "./App.css";
import Navbar from "./componentes/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add";
import Order from "./pages/Order/Order";
import List from "./pages/List/List";
import { ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"; 


function App() {
  const BASE_URL = "http://localhost:4000";
  return (
    <>
      <ToastContainer />
      <Navbar />
      <hr />
      <Routes>
        <Route path="/add" element={<Add BASE_URL={BASE_URL} />} />
        <Route path="/order" element={<Order BASE_URL={BASE_URL} />} />
        <Route path="/list" element={<List   BASE_URL={BASE_URL} />} />
      </Routes>
    </>
  );
}

export default App;
