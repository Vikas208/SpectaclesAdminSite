export const login = async (data) => {
  let response = await fetch("/api/user/login?admin=true", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
};
export const logoutAccount = async () => {
  let response = await fetch("/api/user/logout?admin=true", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  return response;
};

export const forgotPassword = async (mail) => {
  let response = await fetch(`/api/user/forgotPassword?mail=${mail}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  return response;
};

export const validateOpt = async (mail, otp) => {
  let response = await fetch(`/api/user/validateOtp?mail=${mail}&otp=${otp}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  return response;
};

export const resetUserPassword = async (data) => {
  let response = await fetch(`/api/user/resetPassword`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response;
};

export const isUserLogined = async () => {
  let response = await fetch("/api/isUserLogined?admin=true", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  return response;
};
