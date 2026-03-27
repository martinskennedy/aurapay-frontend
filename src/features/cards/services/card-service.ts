import api from "@/lib/api";

export interface CardResponse {
  id: string;
  cardHolderName: string;
  lastFourDigits: string;
  expiryDate: string;
  isActive: boolean;
}

export interface CardSensitiveDataResponse {
  cardHolderName: string;
  cardNumber: string;
  cvv: string;
  expiryDate: string;
}

export interface CreateVirtualCardRequest {
  holderName: string;
}

export interface ToggleCardStatusResponse {
  message: string;
}

export const cardService = {
  // POST /api/cards/virtual
  createVirtual: async (
    payload: CreateVirtualCardRequest,
  ): Promise<CardResponse> => {
    const response = await api.post<CardResponse>("/cards/virtual", payload);
    return response.data;
  },

  // GET /api/cards/my-cards
  getMyCards: async (): Promise<CardResponse[]> => {
    const response = await api.get<CardResponse[]>("/cards/my-cards");
    return response.data;
  },

  // GET /api/cards/{cardId}/reveal
  revealCardData: async (cardId: string): Promise<CardSensitiveDataResponse> => {
    const response = await api.get<CardSensitiveDataResponse>(
      `/cards/${cardId}/reveal`,
    );
    return response.data;
  },

  // PATCH /api/cards/{cardId}/toggle-status
  toggleStatus: async (cardId: string): Promise<ToggleCardStatusResponse> => {
    const response = await api.patch<ToggleCardStatusResponse>(
      `/cards/${cardId}/toggle-status`,
    );
    return response.data;
  },
};
