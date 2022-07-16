import AsyncStorage from "@react-native-async-storage/async-storage";

export type Transaction = {
  name: string;
  amount: string;
  transactionType: string;
  category: string;
};

const BASE_DATA_KEY = "@gofinances:transactions";

export function useTransactionsStorage() {
  async function addTransactionToStorage(transaction: Transaction) {
    const oldItemsStorage = await AsyncStorage.getItem(BASE_DATA_KEY);

    const oldItems: Transaction[] = JSON.parse(
      oldItemsStorage ?? "[]"
    ) as Transaction[];

    const newItems = [...oldItems, transaction];

    await AsyncStorage.setItem(BASE_DATA_KEY, JSON.stringify(newItems));
  }

  async function loadTransactions() {
    const transactionsStorage = await AsyncStorage.getItem(BASE_DATA_KEY);

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
