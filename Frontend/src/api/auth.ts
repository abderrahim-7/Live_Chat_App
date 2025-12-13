import api from "./axios.js";

export const signUp = async (username : string,password : string) => {
    const res = await api.post("/api/auth/signup", {
    username,
    password,
  });
    return res.data;
}

export const login = async (username : string, password : string) => {
    const res = await api.post("/api/auth/login",{username, password})
    return res.data;
}

