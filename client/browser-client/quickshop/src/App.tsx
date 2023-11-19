import { ReactNode } from "react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Divider from "./components/general/Divider";
import Header from "./components/header/Header";
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Product from "./pages/UserProduct";

interface PrivateRouteProps {
  element: JSX.Element;
  roles: string[];
}

function PrivateRoute ({ element, roles }: PrivateRouteProps): JSX.Element {
  const authState = useSelector((state: RootState) => state.authentication);
  const {token, data} = authState.session
  const isAuthenticated = token ? true : false;
  const userRole = data ? data.role : 'GUEST';
  if (isAuthenticated && roles.includes(userRole)) {
    return element;
  }
  return <Navigate to="/" replace />;
};

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <Divider />
      <Routes>
        <Route  path="/">
          <Route index  element={<Home />} />
          <Route path="signin" element={<SignIn />}/>
          <Route path="signup" element={<SignUp />}/>
        </Route>
        <Route path="/admin">
          <Route 
            index 
            element={
              <PrivateRoute element={<Dashboard />} roles={['ADMIN']} />
            }
          />
          <Route 
            path="product"
            element={
              <PrivateRoute element={<Product />} roles={['ADMIN']} />
            }
          />
        </Route>
        <Route path="/seller">
          <Route 
            index 
            element={
              <PrivateRoute element={<Dashboard />} roles={['SELLER']} />
            }
          />
          <Route 
            path="product"
            element={
              <PrivateRoute element={<Product />} roles={['SELLER']} />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
