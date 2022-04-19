export const uploadProductCarousel = async (id, data) => {
  for (let [key, value] of data) {
    console.log(key + ":" + value);
  }
  let response = await fetch(`/api/cloud/uploadProductCarousel?id=${id}`, {
    method: "POST",
    body: data,
  });
  return response;
};
export const uploadImage = async (id, data) => {
  const response = await fetch(`/api/cloud/upload?p_id=${id}`, {
    method: "POST",
    body: data,
  });
  return response;
};

export const uploadCarousel = async (data) => {
  let response = await fetch(`/api/cloud/uploadCarousel`, {
    method: "POST",
    body: data,
  });
  return response;
};
export const uploadLogo = async (data) => {
  let response = await fetch(`/api/cloud/uploadLogo`, {
    method: "POST",
    body: data,
  });
  return response;
};
