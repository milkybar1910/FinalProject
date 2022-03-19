import axios from "axios";
import { API } from "../../backend";

//signup call to DB
export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
//signin call to DB
export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
//signout call to DB
export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();

    return axios
      .get(`${API}/signout`)
      .then((response) => response.data)
      .catch((err) => console.log(err));
  }
};

export const forgotPassword = (data) => {
  return axios({
    method: "put",
    url: `${API}/forgotPassword`,
    data: JSON.stringify(data),
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

export const getCoverpic = (id) =>
  axios({
    method: "get",
    url: `${API}/student/coverphoto/${id}`,
  })
    .then((response) => response.data)
    .catch((err) => console.log(err));

export const getProfilepic = (id) =>
  axios({
    method: "get",
    url: `${API}/student/profilephoto/${id}`,
  })
    .then((response) => response.data)
    .catch((err) => console.log(err));

export const updateProfilePhoto = (id, data) => {
  axios({
    method: "put",
    url: `${API}/student/profilephoto/post/${id}`,
    data: data,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};

export const updateCoverPhoto = (id, data) => {
  axios({
    method: "put",
    url: `${API}/student/coverphoto/post/${id}`,
    data: data,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};
export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
  }
  next();
};

//storing values to local storage
// export const authenticate = (data, next) => {
//   if (typeof window !== "undefined") {
//     localStorage.setItem("jwt", JSON.stringify(data));
//     if (data.student["role"] === 0) {
//       async function StudentNotification() {
//         return getNotified(
//           await getStudentForNotifications(
//             data.student["_id"],
//             data.token
//           ).then((data1) => data1)
//         );
//       }

//       const getNotified = (studentPropertiesColumn) => {
//         return getNotifications(data.student["Year Of Admission"])
//           .then((forms) => {
//             let result = forms.result.filter((forms) => {
//               return studentPropertiesColumn.includes(forms._id) === false;
//             });
//             localStorage.setItem("notification", result.length);
//           })
//           .catch((err) => console.log(err));
//       };
//       StudentNotification();
//     }
//     next();
//   }
// };

//checking authenticated or not by checking the local storage

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
