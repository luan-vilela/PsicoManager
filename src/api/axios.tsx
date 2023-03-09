import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export const useApi = () => ({
  get: async (url: string) => {
    return await api
      .get(url, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((res) => res.data);
  },

  post: async (url: string, data: any) => {
    return await api
      .post(url, data, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((res) => res.data);
  },

  delete: async (url: string) => {
    return await api
      .delete(url, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((res) => res.data);
  },
});
