import api from "./axios.js";

export const getRoom = async (id:string|undefined)  => {
    const res = await api.get(`/api/room?id=${id}`)
    return res.data
}

export const getRooms = async () => {
    const res = await api.get("/api/room/rooms");
    console.log(res.data);
    return res.data;
}

export const createRoom = async (name: string) => {
    const res = await api.post("/api/room/create",{ name});
    return res.data;
}

export const joinRoom = async (code : string) => {
    const res = await api.post("api/room/join",{code})
    return res.data
}

export const quitRoom = async (id : string) => {
    const res = await api.delete(`api/room/quit?id=${id}`)
    return res.data
}