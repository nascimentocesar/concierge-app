import axios from "axios";

const baseUrl = process.env.API_BASE_URL;

export const post = async (url: string, data: any) => {
  return axios.post(`${baseUrl}${url}`, data).catch((error) => {
    console.error("Error sending POST request:", error);
    throw error;
  });
};

export const get = async (url: string, params: any) => {
  return axios.get(`${baseUrl}${url}`, { params }).catch((error) => {
    console.error("Error sending GET request:", error);
    throw error;
  });
};
