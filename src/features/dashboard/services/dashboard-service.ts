import { accountService } from "@/features/accounts/services/account-service";
import { cardService } from "@/features/cards/services/card-service";
import {
  transactionService,
  TransactionHistoryItem,
} from "@/features/transactions/services/transaction-service";

export interface DashboardData {
  balance: number;
  activeCards: number;
  history: TransactionHistoryItem[];
}

export const dashboardService = {
  getDashboardData: async (): Promise<DashboardData> => {
    const [balanceData, cardsData, historyData] = await Promise.all([
      accountService.getBalance(),
      cardService.getMyCards(),
      transactionService.getHistory(),
    ]);

    return {
      balance: balanceData.balance,
      activeCards: cardsData.filter((card) => card.isActive).length,
      history: historyData,
    };
  },
};
