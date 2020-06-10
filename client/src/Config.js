import axios from "axios";
const apiURL = process.env.REACT_APP_NODE_API;

//************USED IN HEADER*************//
export const signOut = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
    return axios
      .get(apiURL + "/signout")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }

  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#44ff77" };
  } else {
    return { color: "#fff" };
  }
};

//************USED IN ADMIN LIST **************//
export const deleteMultipleGods = (godIds) => {
  return axios.delete(apiURL + "/gods/delete_gods/" + godIds).catch((error) => {
    console.log(error);
  });
};

export const getAllGods = () => {
  return axios.get(apiURL + "/gods").then((res) => {
    return res.data;
  });
};

//************USED IN ADD GOD **********//
export const addGod = (godDetails) => {
  return axios.post(apiURL + "/gods/add_god", godDetails).then((res) => {
    return res;
  });
};

/**************USED IN SIGNUP*********/
export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signUp = (userDetails) => {
  return axios
    .post(apiURL + "/signup", userDetails)
    .catch((error) => {
      return error.response.data;
    })
    .then((res) => {
      return res;
    });
};

/**********USED IN DELETE MODAL ******/
export const deleteGod = (id) => {
  console.log(id);
  return axios
    .delete(apiURL + "/gods/delete_god/" + id)
    .then((res) => {
      console.log("DELETED" + res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

/**********USED IN EDIT MODAL ******/
export const confirmEdit = async (id, details) => {
  return await axios
    .put(apiURL + "/gods/update_god/" + id, details)
    .then((res) => {
      return res;
    })
    .catch((err) => err);
};

/**************USED IN SIGN IN *************/
export const signIn = (userDetails) => {
  console.log(userDetails);
  return axios
    .post(apiURL + "/signin", userDetails)
    .catch((error) => {
      console.log(error);
      return error.response.data;
    })
    .then((res) => {
      return res;
    });
};
