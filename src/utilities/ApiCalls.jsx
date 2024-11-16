import { expireToken } from "./UtilFunctions";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getDataWithToken = async (api) => {
  // console.log("api>>", BASE_URL + api);
  try {
    const response = await fetch(BASE_URL + api, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    if (response.status === 401) {
      expireToken();
    }
    const data = await response.json();
    // console.log(`${api}>> Get:`, data);
    return data;
  } catch (error) {
    throw new Error("Error Getting Data", error);
  }
};

export const postData = async (api, postData) => {
  // console.log(postData);
  try {
    const response = await fetch(BASE_URL + api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(postData),
    });
    if (response.status === 401) {
      expireToken();
    }
    const data = await response.json();
    // console.log(`${api}>> Post:`, data);
    return data;
  } catch (error) {
    // console.log(error.stack);
    throw new Error("Error in post request");
  }
};
export const postDataWithToken = async (api, postData) => {
  try {
    // console.log(postData);
    const response = await fetch(BASE_URL + api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify(postData),
    });
    if (response.status === 401) {
      expireToken();
    }
    const data = await response.json();
    // console.log(`${api}>> Post:`, data);
    return data;
  } catch (error) {
    // console.log(error.stack);
    throw new Error("Error in post request", error);
  }
};

export const putDataWithToken = async (api, postData) => {
  try {
    // console.log(postData);
    const response = await fetch(BASE_URL + api, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify(postData),
    });
    if (response.status === 401) {
      expireToken();
    }
    const data = await response.json();
    // console.log(`${api}>> Put:`, data);
    return data;
  } catch (error) {
    // console.log(error.stack);
    throw new Error("Error in post request", error);
  }
};

export const postMultipartDataWithToken = async (api, postData) => {
  let formData = new FormData();
  // console.log(postData);
  for (const key in postData) {
    if (Object.prototype.hasOwnProperty.call(postData, key)) {
      // if (postData.hasOwnProperty(key)) {
      const value = postData[key];
      if (Array.isArray(value)) {
        // If the value is an array, append each file separately
        value.forEach((file) => {
          formData.append(`${key}[]`, file);
          // console.log(`Appended ${key}: ${file.name} to formData`);
        });
      } else {
        formData.append(key, value);
        // console.log(`Appended ${key}: ${value.name || value} to formData`);
      }
    }
  }
  for (let pair of formData.entries()) {
    // console.log(pair[0] + ":" + pair[1]);
  }
  try {
    // console.log(postData);
    const response = await fetch(BASE_URL + api, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: formData,
    });
    // console.log(response.status);
    if (response.status === 401) {
      expireToken();
    }
    const data = await response.json();
    // console.log(`${api}>> Post Multi:`, data);
    return data;
  } catch (error) {
    // console.log(error.stack);
    throw new Error("Error in post request", error);
  }
};

export const deleteDataWithToken = async (api) => {
  try {
    const response = await fetch(BASE_URL + api, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    if (response.status === 401) {
      expireToken();
    }
    // console.log(response);
    const data = await response.json();
    // console.log(`${api}>> Delete:`, data);

    return data;
  } catch (error) {
    throw new Error("Error in delete request", error);
  }
};
