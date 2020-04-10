export const postData = async (url = "", data = {}, token = "") => {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const getData = async (url = "", token = "") => {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return await response.json();
};

export const deleteData = async (url = "", token = "") => {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return await response.json();
};
