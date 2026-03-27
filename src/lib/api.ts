import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar o Token JWT em todas as chamadas
api.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("aurapay-token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Interceptor para tratar erro 401 (Token expirado ou inválido)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("aurapay-token");
        sessionStorage.removeItem("aurapay-auth-storage");
        window.location.href = "/auth/login";
      }
    }
    // Extrai a mensagem de erro do backend, se disponível
    const data = error?.response?.data;
    const backendMessage =
      typeof data === "string"
        ? data
        : data?.message ||
          data?.Message ||
          data?.error ||
          data?.Error ||
          data?.title ||
          (Array.isArray(data?.errors)
            ? data.errors.join(" | ")
            : typeof data?.errors === "object"
              ? Object.values(data.errors).flat().join(" | ")
              : undefined) ||
          error?.message ||
          "Erro inesperado.";

    return Promise.reject(new Error(backendMessage));
  },
);

export default api;
