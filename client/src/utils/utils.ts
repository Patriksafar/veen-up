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
