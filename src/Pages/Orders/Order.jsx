import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  getAllCancelOrders,
  deleteOrder,
  getAllPlacedOrders,
  UpdateOrderDetails,
  getAllShippedOrders,
  getAllDeliveredOrders,
  UpdateOrderServiceDetails,
  cancelOrder,
  cancelOrderMail,
} from "../../API/Order";
import Card from "../../Components/Card";
import { toast } from "react-toastify";
import { getServiceDetails } from "../../API/shopDetails";
function Order() {
  return (
    <div>
      <div className="container-fluid pt-4 px-4 d-flex justify-content-center mt-4">
        <div className="row g-4">
          <div className="col">
            <Link
              to={"/orders/placedOrders"}
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              <Card Imageclass={"fa fa-area-chart"} name={"Placed Orders"} />
            </Link>
          </div>
          <div className="col">
            <Link
              to={"/orders/shippedOrders"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Card Imageclass={"fa fa-area-chart"} name={"Shipped Orders"} />
            </Link>
          </div>
          <div className="col">
            <Link
              to={"/orders/canceledOrders"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Card Imageclass={"fa fa-area-chart"} name={"Cancel Orders"} />
            </Link>
          </div>
          <div className="col">
            <Link
              to={"/orders/deliveredOrders"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Card Imageclass={"fa fa-area-chart"} name={"Delivered Orders"} />
            </Link>
          </div>
        </div>
      </div>
      <div className="container-fluid mb-4">
        <Outlet />
      </div>
    </div>
  );
}
export default Order;

function ProductCard({ element }) {
  return (
    <div>
      <div className="d-flex flex-column p-3 m-1">
        <section className="header d-flex justify-content-between">
          <span>#Order</span>
          <span>{element?.localDateTime}</span>
        </section>
        <section
          className="d-flex flex-column"
          style={{ letterSpacing: "1px" }}
        >
          <small>Customer Name:{element?.login?.name}</small>
          <small>Customer MailId:{element?.login?.mailId}</small>
          <small>
            Address:
            {" " +
              element?.orderAddress?.address1 +
              "," +
              (element?.orderAddress?.address2 == null
                ? ""
                : element?.orderAddress?.address2) +
              "," +
              element?.orderAddress?.city +
              "-" +
              element?.orderAddress?.pincode +
              ", " +
              element?.orderAddress?.state}
          </small>
          <small>
            Payble Amount:
            {" " + Number(element?.orderPayment?.total_amount)?.toFixed(2)}
          </small>
          <small>
            Payment Type:
            {" " + element?.orderPayment?.payment_type}
          </small>
          <small>
            Payment Status:
            {" " +
              (Boolean(element?.orderPayment?.payment_status)
                ? "Done"
                : "Pending")}
          </small>
          <small>
            Transaction Id:
            {" " +
              (element?.orderPayment?.transactionid == null
                ? "-"
                : element?.orderPayment?.transactionid)}
          </small>
          <small>
            Order Status:
            {" " + element?.order_status}
          </small>
          <small>
            Service By:
            {" " +
              element?.service?.name +
              " | " +
              element?.service?.phonenumber}
          </small>
        </section>
        <table className="table mt-3">
          <thead>
            <tr>
              <th scope="col">
                <small> Product Name</small>
              </th>
              <th scope="col">
                <small>Price</small>
              </th>
              <th scope="col">
                <small>Qty</small>
              </th>
              <th scope="col">
                <small>Total Price</small>
              </th>
            </tr>
          </thead>
          <tbody>
            {element?.orderedProducts?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <small>{item?.products?.p_name}</small>
                    <small
                      style={{
                        float: "right",
                        verticalAlign: "middle",
                        cursor: "pointer",
                        margin: "2px",
                      }}
                      onClick={() => {
                        let table = document.getElementById(index + "table");
                        if (table.style.display === "none") {
                          table.style.display = "block";
                        } else {
                          table.style.display = "none";
                        }
                      }}
                    >
                      Read more...
                    </small>

                    <table
                      style={{ fontSize: "small", display: "none" }}
                      className="table table-striped mt-2 "
                      id={index + "table"}
                    >
                      <tbody>
                        <tr>
                          <td>OnlyFrame</td>
                          <td>{item?.onlyframe ? "Yes" : "No"}</td>
                        </tr>
                        <tr>
                          <td>Left-Eye-No</td>
                          <td>{item?.left_eye_no}</td>
                        </tr>
                        <tr>
                          <td>Right-Eye-No</td>
                          <td>{item?.right_eye_no}</td>
                        </tr>
                        <tr>
                          <td>Glass Type</td>
                          <td>{item?.glassType}</td>
                        </tr>
                        <tr>
                          <td>Total Price</td>
                          <td>{Number(item?.totalPrice).toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td>Gst</td>
                          <td>{Number(item?.gst).toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td>Other Tax</td>
                          <td>{item?.otherTax}</td>
                        </tr>
                        <tr>
                          <td>Sale</td>
                          <td>{item?.sale}</td>
                        </tr>
                        <tr>
                          <td>Glass Price</td>
                          <td>{item?.glassPrice}</td>
                        </tr>
                        <tr>
                          <td>Product Category</td>
                          <td>
                            {item?.products?.productDescription?.p_category}
                          </td>
                        </tr>
                        <tr>
                          <td>Product Group</td>
                          <td>{item?.products?.productDescription?.p_group}</td>
                        </tr>
                        <tr>
                          <td>Product FrameStyle</td>
                          <td>
                            {item?.products?.productDescription?.p_frameStyle}
                          </td>
                        </tr>
                        <tr>
                          <td>Product FrameSize</td>
                          <td>
                            {item?.products?.productDescription?.p_frameSize}
                          </td>
                        </tr>
                        <tr>
                          <td>Product CompanyName</td>
                          <td>
                            {item?.products?.productDescription?.company_name}
                          </td>
                        </tr>
                        <tr>
                          <td>Product Color</td>
                          <td>{item?.products?.productDescription?.color}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td>
                    <small key={index}>₹{item?.products?.p_price}</small>
                  </td>
                  <td>
                    <small key={index}>{item?.qty}</small>
                  </td>

                  <td>
                    <small key={index}>
                      ₹{Number(item?.totalPrice).toFixed(2)}
                    </small>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export function CanceledOrders() {
  const [cancelOrders, setCancelOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const deleteCancelOrder = async (id) => {
    let ans = window.confirm(
      "Are You Sure? It will also delete the Record of that Order"
    );
    console.log(ans);
    if (ans) {
      let response = await deleteOrder(id);
      if (response.status === 200) {
        let data = cancelOrders?.filter((e, i) => {
          return e?.order_id !== id;
        });
        setCancelOrders(data);
      } else {
        toast.error("Something is Wrong");
      }
    }
  };
  useEffect(() => {
    setLoading(true);
    async function CancelOrders() {
      let response = await getAllCancelOrders();
      if (response.status === 200) {
        let result = await response.json();
        setCancelOrders(result);
      }
    }
    CancelOrders();
    setLoading(false);
    return () => {
      setCancelOrders([]);
      setLoading(false);
    };
  }, []);
  return (
    <div className="container-fluid">
      {loading && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      <h4 className="ms-3" style={{ letterSpacing: "2px" }}>
        Cancel Orders
      </h4>
      {cancelOrders &&
        typeof cancelOrders === "object" &&
        cancelOrders?.length === 0 && (
          <div
            className="w-100 container-fluid"
            style={{
              textAlign: "center",
              fontSize: "18px",
              letterSpacing: "2px",
            }}
          >
            <span>!! No Canceled Orders !!</span>
          </div>
        )}
      {cancelOrders &&
        typeof cancelOrders === "object" &&
        cancelOrders?.map((element, index) => {
          return (
            <div
              key={index}
              className="d-flex flex-column mb-3"
              style={{
                borderRadius: "10px",
                boxShadow:
                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
              }}
            >
              <ProductCard element={element} />
              <div className="d-flex">
                <button
                  className="d-flex justify-content-center btn btn-danger m-2 w-100 "
                  style={{ borderRadius: "50px" }}
                  onClick={() => {
                    deleteCancelOrder(element?.order_id);
                  }}
                >
                  <span className="material-icons">delete</span>
                  Delete Order Details
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}
export function PlacedOrders() {
  const [placedOrder, setPlacedOrder] = useState([]);
  useEffect(() => {
    async function getPlacedOrderData() {
      let response = await getAllPlacedOrders();
      if (response.status === 200) {
        let result = await response.json();
        setPlacedOrder(result);
      }
    }
    getPlacedOrderData();
    return () => {
      setPlacedOrder([]);
    };
  }, []);
  return (
    <>
      <h4 className="ms-3" style={{ letterSpacing: "2px" }}>
        Placed Orders
      </h4>
      {placedOrder &&
        typeof placedOrder === "object" &&
        placedOrder?.length === 0 && (
          <div
            className="w-100 container-fluid"
            style={{
              textAlign: "center",
              fontSize: "18px",
              letterSpacing: "2px",
            }}
          >
            <span>!! No Placed Orders !!</span>
          </div>
        )}
      <OrdersCard orders={placedOrder} />
    </>
  );
}
export function OrdersCard({ orders }) {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [ProductId, setProductId] = useState(0);
  const [service, setServiceDetails] = useState([]);
  const [orderStatus, setOrderStatus] = useState("");

  document.addEventListener("mouseup", (e) => {
    let box = document.getElementById("processForm");
    if (box && !box.contains(e.target)) {
      setProductId(0);
      setOpen(false);
    }
  });
  const updateOrderStatus = async (e) => {
    e.preventDefault();
    let formdata = new FormData(e.target);
    let data = {};
    for (let [key, value] of formdata) {
      data[key] = value;
    }
    data["payment_status"] =
      data["payment_status"].toLowerCase() === "pending" ? false : true;
    data["orderPayment"] = {
      payment_status: data["payment_status"],
    };
    delete data["payment_status"];
    data["order_id"] = orderData[ProductId]?.order_id;
    if (orderStatus === "SHIPPED" || orderStatus === "DELIVERED") {
      let body = {
        order_id: data["order_id"],
        service_id: data["service_id"],
      };
      let response = await UpdateOrderServiceDetails(body);
      if (response.status !== 200) {
        toast.error("something is wrong");
        return;
      }
    }
    console.log(data);

    let response = await UpdateOrderDetails(data);
    if (response.status === 200) {
      toast.success("Updated");
    } else {
      toast.error("Something is wrong");
    }
  };
  const CancelOrder = async (id) => {
    let reason = window.prompt(
      "Enter Any Reason for Cancel Order.[This reason send to the User]"
    );
    console.log(reason);
    let ans = window.confirm("Are You Sure?");
    if (ans) {
      let response = await cancelOrder(id);
      if (response.status === 200) {
        let res = await cancelOrderMail(id, reason);
        if (res.status !== 200) {
          toast.error("Order Canceled But Mail Not Sended");
        }

        let data = orders?.filter((e, i) => {
          return e?.order_id !== id;
        });
        setOrderData(data);
      } else {
        toast.error("Something is Wrong");
      }
    }
  };
  useEffect(() => {
    setOrderStatus(orders[ProductId]?.order_status);

    return () => {
      setOrderStatus("");
    };
  }, [open]);
  useEffect(() => {
    setOrderData(orders);
    return () => {
      setOrderData([]);
    };
  }, [orders]);
  useEffect(() => {
    setLoading(true);

    async function getServiceData() {
      let response = await getServiceDetails();
      if (response.status === 200) {
        let result = await response.json();
        setServiceDetails(result);
      }
    }
    getServiceData();
    setLoading(false);
    return () => {
      setLoading(false);
      setOpen(false);
      setServiceDetails([]);
      setOrderStatus("");
      setProductId(0);
      setOrderData([]);
    };
  }, []);

  return (
    <div>
      {loading && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      {orderData &&
        typeof orderData === "object" &&
        orderData?.map((element, index) => {
          return (
            <div
              key={index}
              className="d-flex flex-column mb-3"
              style={{
                borderRadius: "10px",
                boxShadow:
                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
              }}
            >
              <ProductCard element={element} />
              <div className="d-flex">
                <button
                  className="d-flex justify-content-center btn btn-primary m-2 w-100 "
                  style={{ borderRadius: "50px" }}
                  onClick={() => {
                    setProductId(index);
                    setOpen(true);
                  }}
                >
                  <span className="material-icons">edit</span>
                  Proceed Orders
                </button>
              </div>
              <div className="d-flex">
                <button
                  className="d-flex justify-content-center btn btn-danger m-2 w-100 "
                  style={{ borderRadius: "50px" }}
                  onClick={() => {
                    console.log(element);

                    CancelOrder(element?.order_id);
                  }}
                >
                  <span className="material-icons">delete</span>
                  Cancle Order
                </button>
              </div>
            </div>
          );
        })}

      {open && orderData && typeof orderData === "object" && (
        <form
          onSubmit={updateOrderStatus}
          id="processForm"
          className="container mb-3"
          style={{
            position: "absolute",
            zIndex: 2000,
            backgroundColor: "white",
            top: 25,
            marginLeft: "20px",
            padding: "15px",
            width: "75%",
            textAlign: "center",
            borderRadius: "10px",
            boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
          }}
        >
          <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
              <div className="input-group-text">Payment Status</div>
            </div>
            <select
              id="inputState"
              className="form-control"
              required
              name="payment_status"
            >
              <option value="">Choose...</option>
              <option
                value="Pending"
                selected={!orderData[ProductId]?.orderPayment?.payment_status}
              >
                Pending
              </option>
              <option
                value="Done"
                selected={orderData[ProductId]?.orderPayment?.payment_status}
              >
                Done
              </option>
            </select>
          </div>
          <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
              <div className="input-group-text">Order Status</div>
            </div>
            <select
              id="inputState"
              className="form-control"
              required
              name="order_status"
              onChange={() => {
                setOrderStatus(
                  document.getElementsByName("order_status")[0]?.value
                );
              }}
            >
              <option value="">Choose...</option>
              <option
                value="PLACED"
                selected={orderData[ProductId]?.order_status === "PLACED"}
              >
                PLACED
              </option>
              <option
                value="SHIPPED"
                selected={orderData[ProductId]?.order_status === "SHIPPED"}
              >
                SHIPPED
              </option>
              <option
                value="DELIVERED"
                selected={orderData[ProductId]?.order_status === "DELIVERED"}
              >
                DELIVERED
              </option>
            </select>
          </div>
          {(String(orderStatus) === "SHIPPED" ||
            String(orderStatus) === "DELIVERED") &&
            service &&
            typeof service === "object" && (
              <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">Service</div>
                </div>
                <select
                  id="inputState"
                  className="form-control"
                  required
                  name="service_id"
                >
                  <option value="">Choose...</option>
                  {service?.map((element, index) => {
                    return (
                      <option
                        value={element?.id}
                        key={index}
                        selected={
                          element?.id === orderData[ProductId]?.service?.id
                        }
                      >
                        {element?.name} | {element?.phonenumber}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
          <button className="btn btn-primary w-100">Proceed</button>
        </form>
      )}
    </div>
  );
}
export function ShippedOrders() {
  const [shippedOrder, setShippedOrder] = useState([]);
  useEffect(() => {
    async function ShippedOrders() {
      let response = await getAllShippedOrders();
      if (response.status === 200) {
        let result = await response.json();
        setShippedOrder(result);
      }
    }
    ShippedOrders();
    return () => {
      setShippedOrder([]);
    };
  }, []);
  return (
    <>
      <h4 className="ms-3" style={{ letterSpacing: "2px" }}>
        Shipped Orders
      </h4>
      {shippedOrder &&
        typeof shippedOrder === "object" &&
        shippedOrder?.length === 0 && (
          <div
            className="w-100 container-fluid"
            style={{
              textAlign: "center",
              fontSize: "18px",
              letterSpacing: "2px",
            }}
          >
            <span>!! No Shipped Orders !!</span>
          </div>
        )}
      <OrdersCard orders={shippedOrder} />
    </>
  );
}
export function DeliveredOrders() {
  const [deliveredOrder, setDeliveredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const deleteOrderData = async (id) => {
    let ans = window.confirm(
      "Are You Sure? It will also delete the Record of that Order"
    );
    if (ans) {
      let response = await deleteOrder(id);
      if (response.status === 200) {
        let data = deliveredOrder?.filter((e, i) => {
          return e?.order_id !== id;
        });
        setDeliveredOrders(data);
      } else {
        toast.error("Something is Wrong");
      }
    }
  };
  useEffect(() => {
    setLoading(true);
    async function DeliveredOrders() {
      let response = await getAllDeliveredOrders();
      if (response.status === 200) {
        let result = await response.json();
        setDeliveredOrders(result);
      }
    }
    DeliveredOrders();
    setLoading(false);
    return () => {
      setDeliveredOrders([]);
      setLoading(false);
    };
  }, []);
  return (
    <div className="container-fluid">
      {loading && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      <h4 className="ms-3" style={{ letterSpacing: "2px" }}>
        Delivered Orderes
      </h4>
      {deliveredOrder &&
        typeof deliveredOrder === "object" &&
        deliveredOrder?.length === 0 && (
          <div
            className="w-100 container-fluid"
            style={{
              textAlign: "center",
              fontSize: "18px",
              letterSpacing: "2px",
            }}
          >
            <span>!! No Delivered Orders !!</span>
          </div>
        )}
      {deliveredOrder &&
        typeof deliveredOrder === "object" &&
        deliveredOrder?.map((element, index) => {
          return (
            <div
              key={index}
              className="d-flex flex-column mb-3"
              style={{
                borderRadius: "10px",
                boxShadow:
                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                background: "#f3f6f9",
              }}
            >
              <ProductCard element={element} />
              <div className="d-flex">
                <button
                  className="d-flex justify-content-center btn btn-danger m-2 w-100 "
                  style={{ borderRadius: "50px" }}
                  onClick={() => {
                    deleteOrderData(element?.order_id);
                  }}
                >
                  <span className="material-icons">delete</span>
                  Delete Order Details
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}
