import axios from 'axios';
import { supabase } from '@/lib/supabase';

// Cria uma instância do Axios para chamadas à API do backend .NET
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Interceptador para adicionar o token JWT do Supabase em todas as requisições ao backend .NET
api.interceptors.request.use(async (config) => {
  // Pega a sessão atual do Supabase
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session?.access_token) {
    // Injeta o Token JWT que o seu backend .NET espera no [Authorize]
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  
  return config;
});