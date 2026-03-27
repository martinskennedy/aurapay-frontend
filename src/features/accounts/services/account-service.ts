import api from "@/lib/api";

export interface AccountBalanceResponse {
  id: string;
  accountNumber: string;
  balance: number;
  createdAt: string;
}

export const accountService = {
  // GET /api/accounts/balance
  getBalance: async (): Promise<AccountBalanceResponse> => {
    const response = await api.get<AccountBalanceResponse>("/accounts/balance");
    return response.data;
  },
};
