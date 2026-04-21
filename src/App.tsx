import "./css/App.css";
import { Link, Outlet } from "react-router";

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About Us</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
