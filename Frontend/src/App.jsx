import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Addproduct from "./pages/Addproduct";
import Editproduct from "./pages/Editproduct";
import Productform from "./pages/Productform";
import productpage from "./pages/productpage";

function App = () => {
  return (
    <BrowserRouter>
     <Routes>
       <Route path="/" element={<Navigate to="/productpage" />} />
       <Route path="/productpage" element={<productpage />} />
       <Route path="/addproduct/new" element={<Addproduct />} />
       <Route path="/editproduct/:id" element={<Editproduct />} />
       <route path="*" element={<Productform />} />
     </Routes>
    </BrowserRouter>
  );
};

export default App;