import axios from "axios";
import { API } from "../../backend";

export const updateToggle = (toggle) => {
  return axios({
    method: "post",
    url: `${API}/toggle/`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(toggle),
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};

export const getToggleDetails = (opts) => {
  return axios({
    method: "get",
    url: `${API}/toggleInfo`,
    headers: {
      Accept: "application/json",
    },
    opts,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};

export const getBatch = () => {
  return axios({
    method: "get",
    url: `${API}/uniqueBatch`,
  })
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

export const updateFields = (id, token, Form) => {
  return axios({
    url: `${API}/dynamicform/create/${id}`,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(Form),
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};

export const getFormsNameInAdmin = () => {
  return axios({
    url: `${API}/formnames/details/`,
    method: "get",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};

export const deleteForms = (id, year) => {
  return axios({
    url: `${API}/form/${id}/${year}`,
    method: "put",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};

export const searchForm = (id, year) => {
  return axios({
    url: `${API}/dynamicForms/submission/details/${id}/${year}`,
    method: "get",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};
