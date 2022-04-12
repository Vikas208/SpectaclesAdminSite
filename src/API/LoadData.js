export const loadShopDetails = async () => {
  let response = await fetch("/api/load/loadDetails", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  return response;
};
export const loadDashBoard = async () => {
  let response = await fetch("/api/admin/dashboard/getDashBoardDetails", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  return response;
};

export const loadNotifications = async () => {
  let response = await fetch("/api/admin/dashboard/notifications", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  return response;
};

export const getData = async () => {
  let response = await fetch("/api/products/fetch/getData", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  return response;
};
export const getGlassTypes = async () => {
  let response = await fetch("/api/glassCharges", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  return response;
};
export const getCarousel = async () => {
  let response = await fetch("/api/load/carousel", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  return response;
};
export const getUsers = async () => {
  let response = await fetch("/api/getAllUsers", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  return response;
};

export const getReivews = async (id) => {
  let response = await fetch(
    `/api/products/fetch/getProductReviews?productId=${id}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );
  return response;
};

export const DeleteReview = async (id, reason) => {
  let response = await fetch(
    `/api/products/fetch/DeleteProductReviews?id=${id}&reason=${reason}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }
  );
  return response;
};
