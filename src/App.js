import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Forgot from "./Pages/Auth/Forgot";
import Main from "./Pages/Main";
import Signin from "./Pages/Auth/Signin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDataLayerValue } from "./DataLayer";
import { useEffect, useLayoutEffect } from "react";
import { isUserLogined } from "./API/Authentication";
import { action } from "./Reducer/action";
import Account from "./Pages/Account/Account";
import DashBoard from "./Pages/DashBoard/DashBoard";
import { getData, loadShopDetails } from "./API/LoadData";
import Product from "./Pages/Product/Product";
import ShopDetails from "./Pages/shopDetails/ShopDetails";
import Users from "./Pages/Users/Users";
import Order, {
  CanceledOrders,
  DeliveredOrders,
  PlacedOrders,
  ShippedOrders,
} from "./Pages/Orders/Order";
import Review from "./Pages/Reviews/Review";
import Notfound from "./Pages/NotFound/Notfound";

function App() {
  const [{ token, reloadDetails }, dispatch] = useDataLayerValue();
  const navigate = useNavigate();

  const isLogined = async () => {
    let response = await isUserLogined();
    if (response.status === 200) {
      const result = await response.json();
      dispatch({
        type: action.SETTOKEN,
        token: result?.token,
      });
      dispatch({
        type: action.LOGINUSER,
        user: result?.userDetails,
      });
    } else {
      navigate("/signin");
    }
  };

  const loadShopdetails = async () => {
    let response = await loadShopDetails();
    if (response.status === 200) {
      let result = await response.json();
      dispatch({
        type: action.SHOPDETAILS,
        shopDetails: result,
      });
    }

    response = await getData();
    if (response.status === 200) {
      let result = await response.json();
      dispatch({
        type: action.SETDATA,
        data: result,
      });
    }
  };

  useLayoutEffect(() => {
    isLogined();
  }, []);

  useEffect(() => {
    // console.log("reload");
    if (token) {
      loadShopdetails();
    }
  }, [token, reloadDetails]);

  return (
    <div className="App">
      <Routes>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/forgot" element={<Forgot />}></Route>
        <Route path="/" element={token ? <Main /> : <Signin />}>
          {token && <Route path="/" element={<DashBoard />}></Route>}
          {token && <Route path="/account" element={<Account />}></Route>}
          {token && <Route path="/dashboard" element={<DashBoard />}></Route>}
          {token && <Route path="/products" element={<Product />}></Route>}
          {token && <Route path="/product/:id" element={<Review />}></Route>}
          {token && <Route path="/users" element={<Users />}></Route>}
          {token && (
            <Route path="/orders" element={<Order />}>
              {token && (
                <Route
                  path="/orders/placedOrders"
                  element={<PlacedOrders />}
                ></Route>
              )}
              {token && (
                <Route
                  path="/orders/shippedOrders"
                  element={<ShippedOrders />}
                ></Route>
              )}
              {token && (
                <Route
                  path="/orders/deliveredOrders"
                  element={<DeliveredOrders />}
                ></Route>
              )}
              {token && (
                <Route
                  path="/orders/canceledOrders"
                  element={<CanceledOrders />}
                ></Route>
              )}
            </Route>
          )}
          {token && (
            <Route path="/shopDetails" element={<ShopDetails />}></Route>
          )}
          <Route path="*" element={token ? <Notfound /> : <Signin />}></Route>
        </Route>
      </Routes>
      <ToastContainer
        theme="colored"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
      />
    </div>
  );
}

export default App;
