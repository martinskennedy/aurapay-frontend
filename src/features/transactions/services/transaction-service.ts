import api from "@/lib/api";

export interface TransferRequest {
  destinationAccountNumber: string;
  amount: number;
}

interface TransferResponseRaw {
  message?: string;
  Message?: string;
}

export interface TransferResponse {
  message: string;
}

export interface TransactionHistoryItem {
  id: string;
  amount: number;
  type: "TransferIn" | "TransferOut" | string;
  timestamp: string;
}

export const transactionService = {
  // POST /api/transactions/transfer
  transfer: async (payload: TransferRequest): Promise<TransferResponse> => {
    const response = await api.post<TransferResponseRaw>(
      "/transactions/transfer",
      payload,
    );
    return {
      message:
        response.data.message ??
        response.data.Message ??
        "Transferência realizada com sucesso.",
    };
  },

  // GET /api/transactions/history
  getHistory: async (): Promise<TransactionHistoryItem[]> => {
    const response = await api.get<TransactionHistoryItem[]>(
      "/transactions/history",
    );
    return response.data;
  },
};
