import { jwtDecode } from "jwt-decode";

type TokenPayload = {
  id: string;
};

export const getCurrentUserId = (): string | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded.id;
  } catch {
    return null;
  }
};
