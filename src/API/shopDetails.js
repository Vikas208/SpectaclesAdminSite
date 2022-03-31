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
export const deleteCarouselImage = async (id) => {
  let response = await fetch(`/api/deleteCarouselImage?id=${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });
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
