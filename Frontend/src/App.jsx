import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Addproduct from "../pages/Addproduct";
import Editproduct from "../pages/Editproduct";
import ProductFormPage from "../pages/ProductFormPage";
import Productpage from "../pages/Productpage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/productpage" replace />} />
        <Route path="/productpage" element={<Productpage />} />
        <Route path="/addproduct/new" element={<Addproduct />} />
        <Route path="/editproduct/:id" element={<Editproduct />} />
        <Route path="*" element={<ProductFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
