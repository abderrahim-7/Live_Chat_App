import api from "./axios"

export const getMessages = async (roomId : string | undefined)=>{
    const res = await api.get(`/api/messages/${roomId}`)
    return res.data
}

export const sendMessage = async (content : string,roomId : string) => {
    const res = await api.post(`/api/messages/${roomId}`,{content})
    return res.data
}