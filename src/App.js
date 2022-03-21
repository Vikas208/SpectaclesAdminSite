import { Route, Routes } from "react-router-dom";
import "./App.css";
import Forgot from "./Pages/Auth/Forgot";
import Main from "./Pages/Main";
import Signin from "./Pages/Auth/Signin";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/forgot" element={<Forgot />}></Route>
        <Route path="/" element={<Main />}></Route>
      </Routes>
    </div>
  );
}

export default App;
