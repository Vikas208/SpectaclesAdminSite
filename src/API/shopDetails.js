export const updateShopDetails = async (data) => {
  let response = await fetch(`/api/updateShopDetails`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response;
};

export const updateShopContactDetails = async (data, param) => {
  let response = await fetch(`/api/updateShopContactDetails?contact=${param}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response;
};

export const updateGlassDetails = async (data) => {
  let response = await fetch(`/api/updateGlassDetails`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response;
};

export const updateData = async (data, type) => {
  let response = await fetch(`/api/updateData?type=${type}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response;
};

export const deleteData = async (id, type) => {
  let response = await fetch(`/api/deleteData?id=${id}&type=${type}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });
  return response;
};

export const deleteGlassDetails = async (id) => {
  let response = await fetch(`/api/deleteGlassDetails?id=${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });
  return response;
};
export const deleteCarouselImage = async (id, filePath) => {
  let response = await fetch(
    encodeURI(`/api/deleteCarouselImage?id=${id}&filePath=${filePath}`),
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

export const addData = async (data, type) => {
  let response = await fetch(`/api/addData?type=${type}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
};

export const addGlassDetails = async (data) => {
  let response = await fetch(`/api/addGlassDetails`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
};
export const addCarouselDetails = async (data) => {
  let response = await fetch(`/api/addCarouselDetails`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
};

export const getCarousel = async () => {
  let response = await fetch(`/api/load/carousel`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  return response;
};

export const getServiceDetails = async () => {
  let response = fetch("/api/getServiceDetails", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  return response;
};

export const deleteServiceDetails = async (id) => {
  let response = fetch(`/api/deleteServiceDetails?id=${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });
  return response;
};

export const addServiceDetails = async (data) => {
  let response = fetch(`/api/addServiceDetails`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
};

export const updateServiceDetails = async (data) => {
  let response = fetch(`/api/updateServiceDetails`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response;
};

export const getTaxDetails = async () => {
  let response = fetch(`/api/getTaxData`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  return response;
};

export const updateTaxDetails = async (data) => {
  let response = fetch(`/api/updateTaxData`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response;
};

export const deleteTaxDetails = async (id) => {
  let response = fetch(`/api/deleteTaxData?id=${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });
  return response;
};

export const addTaxDetails = async (data) => {
  let response = fetch(`/api/addTaxData`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
};
