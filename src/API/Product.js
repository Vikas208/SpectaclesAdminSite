export const getAllProduct = async (limit, offset) => {
  let response = await fetch(
    encodeURI(`/api/products/getProducts?limit=${limit}&offset=${offset}`),
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

export const deleteProduct = async (p_id) => {
  let response = await fetch(
    encodeURI(`/api/products/deleteProduct?p_id=${p_id}`),
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

export const updateProduct = async (product) => {
  let response = await fetch(encodeURI(`/api/products/updateProduct`), {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    method: "PUT",
    body: JSON.stringify(product),
  });
  return response;
};

export const countProduct = async () => {
  let response = await fetch(encodeURI(`/api/products/fetch/countProducts`), {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    method: "GET",
  });
  return response;
};

export const updateProductSale = async (data) => {
  let response = await fetch(`/api/products/updateProductSale`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    method: "PUT",
    body: JSON.stringify(data),
  });
  return response;
};

export const saveProduct = async (data) => {
  let response = await fetch(`/api/products/saveProduct`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
};

export const deleteProductImage = async (id, filepath) => {
  let response = await fetch(
    `/api/products/deleteProductImage?id=${id}&filePath=${filepath}`,
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

export const addProductCarousel = async (data) => {
  let response = await fetch("/api/products/addProductCarousel", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
};
