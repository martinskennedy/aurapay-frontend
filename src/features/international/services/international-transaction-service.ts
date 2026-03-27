import api from "@/lib/api";

export interface InternationalTransferPreview {
  originalAmountBrl: number;
  exchangeRate: number;
  iofAmount: number;
  serviceFee: number;
  totalToDeductBrl: number;
  finalAmount: number;
}

export interface InternationalTransferRequest {
  amountBrl: number;
  beneficiaryName: string;
  swiftCode: string;
  iban: string;
  bankName: string;
}

interface InternationalTransferResponseRaw {
  message?: string;
  Message?: string;
}

export interface InternationalTransferResponse {
  message: string;
}

export const internationalTransactionService = {
  // GET /api/internationaltransactions/preview?amountBrl=1000
  getPreview: async (
    amountBrl: number,
  ): Promise<InternationalTransferPreview> => {
    const response = await api.get<InternationalTransferPreview>(
      "/internationaltransactions/preview",
      { params: { amountBrl } },
    );
    return response.data;
  },

  // POST /api/internationaltransactions/transfer
  transfer: async (
    payload: InternationalTransferRequest,
  ): Promise<InternationalTransferResponse> => {
    const response = await api.post<InternationalTransferResponseRaw>(
      "/internationaltransactions/transfer",
      payload,
    );
    return {
      message:
        response.data.message ??
        response.data.Message ??
        "Transferência internacional enviada com sucesso.",
    };
  },
};
