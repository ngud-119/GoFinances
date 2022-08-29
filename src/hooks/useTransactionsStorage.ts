import AsyncStorage from "@react-native-async-storage/async-storage";
import { Transaction } from "../utils/types/transaction";
import { useAuth } from "./useAuth";

const BASE_DATA_KEY = "@gofinances:transactions";

export function useTransactionsStorage() {
  const { userInfo } = useAuth();

  async function addTransactionToStorage(transaction: Transaction) {
    const oldItemsStorage = await AsyncStorage.getItem(BASE_DATA_KEY);

    const oldItems: Transaction[] = JSON.parse(
      oldItemsStorage ?? "[]"
    ) as Transaction[];

    const newItems = [...oldItems, transaction];

    await AsyncStorage.setItem(
      `${BASE_DATA_KEY}-${userInfo.id}`,
      JSON.stringify(newItems)
    );
  }

  async function loadTransactions() {
    const transactionsStorage = await AsyncStorage.getItem(
      `${BASE_DATA_KEY}-${userInfo.id}`
    );

    const transactions: Transaction[] = JSON.parse(
      transactionsStorage ?? "[]"
    ) as Transaction[];

    return transactions;
  }

  return {
    addTransactionToStorage,
    loadTransactions,
  };
}
