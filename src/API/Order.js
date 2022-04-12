export const getAllPlacedOrders = async () => {
  let response = await fetch("/api/Order/getAllPlacedOrders", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  return response;
};

export const getAllShippedOrders = async () => {
  let response = await fetch("/api/Order/getAllShippedOrders", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  return response;
};

export const getAllDeliveredOrders = async () => {
  let response = await fetch("/api/Order/getAllDeliveredOrders", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  return response;
};

export const getAllCancelOrders = async () => {
  let response = await fetch("/api/Order/getAllCancelOrders", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  return response;
};

export const deleteOrder = async (id) => {
  let response = await fetch(`/api/Order/deleteOrder?id=${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });
  return response;
};

export const UpdateOrderDetails = async (data) => {
  let response = await fetch(`/api/Order/updateOrderDetails`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response;
};

export const UpdateOrderServiceDetails = async (data) => {
  let response = await fetch(`/api/Order/updateOrderServiceDetails`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response;
};

export const cancelOrder = async (id) => {
  let response = await fetch(`/api/Order/cancelOrder?order_id=${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
  });
  return response;
};

export const cancelOrderMail = async (id, cancellation) => {
  let response = await fetch(
    `/api/Order/sendCancelOrder?order=${id}&cancellation=${cancellation}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  );
  return response;
};
