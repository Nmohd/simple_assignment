import { Routes, Route  } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import PrivateRoutes from "./components/PrivateRoutes";
import {useEffect} from "react"

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="*" element={<h1>Page Not Found</h1>} />

        <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home />} />
        </Route>



      </Routes>
    </>
  );
}

export default App;
