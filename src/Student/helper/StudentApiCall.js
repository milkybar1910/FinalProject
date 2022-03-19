import axios from "axios";
import { API } from "../../backend";

export const getStudentDetails = (studentID, token) => {
  return axios({
    url: `${API}/student/${studentID}`,
    method: "get",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};

export const getStudentForNotifications = (studentID, token) => {
  return fetch(`${API}/student/admin/${studentID}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//updating the student details
export const updateStudentProfile = (studentId, token, student) => {
  return axios({
    method: "put",
    url: `${API}/student/update/${studentId}`,
    data: JSON.stringify(student),
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};

export const createInternship = (id, token, internship) => {
  return axios({
    method: "post",
    url: `${API}/internship/create/${id}`,
    data: internship,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};

export const getInternship = (id, token) => {
  return axios({
    url: `${API}/internship/details/info/${id}`,
    method: "get",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};

export const removeInternship = (id) => {
  return axios({
    method: "delete",
    url: `${API}/internship/delete/${id}`,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};

export const createWorkshop = (id, token, workshop) => {
  return axios({
    method: "post",
    url: `${API}/workshop/create/${id}`,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: workshop,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};

export const getWorkshop = (id, token) => {
  return axios({
    method: "get",
    url: `${API}/workshop/details/info/${id}`,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};

export const removeWorkshop = (id) => {
  return axios({
    method: "delete",
    url: `${API}/workshop/delete/${id}`,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};

export const createCourse = (id, token, course) => {
  return axios({
    url: `${API}/course/create/${id}`,
    method: "post",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: course,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};

export const getCourse = (id, token) => {
  return axios({
    url: `${API}/course/details/info/${id}`,
    method: "get",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};

export const removeCourse = (id) => {
  return axios({
    url: `${API}/course/delete/${id}`,
    method: "delete",
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};

export const createJob = (id, token, job) => {
  return axios({
    url: `${API}/job/create/${id}`,
    method: "post",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: job,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};

export const getJobInfo = (id, token) => {
  return axios({
    url: `${API}/job/details/info/${id}`,
    method: "get",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};

export const removeJob = (id) => {
  return axios({
    url: `${API}/job/delete/${id}`,
    method: "delete",
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};

export const getNotifications = (year) => {
  return axios({
    url: `${API}/notifications/details/${year}`,
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};

export const DynamicUpdateStudent = (id, form) => {
  return axios
    .put(`${API}/student/dynamicUpdate/${id}`, JSON.stringify(form), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((data) => data.data)
    .catch((err) => console.log(err));
};
