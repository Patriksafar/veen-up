export const postData = async (url = "", data = {}, token = "") => {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "breae " + token
    },
    body: JSON.stringify(data)
  });
  return await response.json();
};

export const getData = async (url = "", token = "") => {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "breae " + token
    }
  });
  return await response.json();
};
