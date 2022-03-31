export const changeUserName = async (data) => {
  let response = await fetch(`/api/userAccount/changeUserName`, {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response;
};

export const validUser = async (data) => {
  let response = await fetch(`/api/userAccount/validUser`, {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
};
