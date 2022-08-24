import React, { useEffect, useState } from "react";
import { HistoryCard } from "../../components/HistoryCard";
import { useTransactionsStorage } from "../../hooks/useTransactionsStorage";
import { categories } from "../../utils/categories";

import * as S from "./styles";

interface TotalByCategory {
  categoryName: string;
  total: string;
  categoryColor: string;
}

export function Resume() {
  const { loadTransactions } = useTransactionsStorage();
  const [expensesByCategory, setExpensesByCategory] = useState(
    [] as TotalByCategory[]
  );

  useEffect(() => {
    async function loadTransactionFromAsyncStorage() {
      const transactions = await loadTransactions();

      const expenses = transactions.filter(
        (transaction) => transaction.type === "negative"
      );

      const totalByCategory: TotalByCategory[] = [];

      categories.forEach((category) => {
        let totalInThisCategory = 0;

        expenses.forEach((expense) => {
          if (category.key === expense.categoryKey) {
            totalInThisCategory += Number(expense.amount);
          }
        });

        if (totalInThisCategory > 0) {
          totalByCategory.push({
            categoryName: category.name,
            total: totalInThisCategory.toLocaleString("pt-BR", {
              currency: "BRL",
              style: "currency",
            }),
            categoryColor: category.color,
          });
        }
      });

      setExpensesByCategory(totalByCategory);
    }

    loadTransactionFromAsyncStorage();
  });

  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo por categoria</S.Title>
      </S.Header>

      <S.Content>
        {expensesByCategory.map((expenseGroupedByCategory) => (
          <HistoryCard
            key={expenseGroupedByCategory.categoryName}
            color={expenseGroupedByCategory.categoryColor}
            title={expenseGroupedByCategory.categoryName}
            amount={expenseGroupedByCategory.total}
          />
        ))}
      </S.Content>
    </S.Container>
  );
}
