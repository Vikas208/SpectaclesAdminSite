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
