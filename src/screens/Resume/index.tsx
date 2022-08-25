import React, { useEffect, useState } from "react";
import { HistoryCard } from "../../components/HistoryCard";
import { VictoryPie, VictoryTheme } from "victory-native";
import { useTransactionsStorage } from "../../hooks/useTransactionsStorage";
import { categories } from "../../utils/categories";

import * as S from "./styles";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

interface TotalByCategory {
  categoryName: string;
  total: number;
  totalFormatted: string;
  percentage: string;
  categoryColor: string;
}

export function Resume() {
  const theme = useTheme();
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

      const totalExpenses = expenses.reduce(
        (total, expense) => total + Number(expense.amount),
        0
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
          const percentage = (
            (totalInThisCategory / totalExpenses) *
            100
          ).toFixed(0);

          totalByCategory.push({
            categoryName: category.name,
            total: totalInThisCategory,
            totalFormatted: totalInThisCategory.toLocaleString("pt-BR", {
              currency: "BRL",
              style: "currency",
            }),
            categoryColor: category.color,
            percentage: `${percentage}%`,
          });
        }
      });

      setExpensesByCategory(totalByCategory);
    }

    loadTransactionFromAsyncStorage();
  }, []);

  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo por categoria</S.Title>
      </S.Header>

      <S.Content>
        <S.ChartContainer>
          <VictoryPie
            data={expensesByCategory.map((expenseByCategory) => ({
              x: expenseByCategory.percentage,
              y: expenseByCategory.total,
            }))}
            colorScale={expensesByCategory.map(
              (expenseByCategory) => expenseByCategory.categoryColor
            )}
            style={{
              labels: {
                fontSize: RFValue(16),
                fontWeight: "600",
                fill: theme.colors.shape,
              },
            }}
            labelRadius={70}
          />
        </S.ChartContainer>

        {expensesByCategory.map((expenseGroupedByCategory) => (
          <HistoryCard
            key={expenseGroupedByCategory.categoryName}
            color={expenseGroupedByCategory.categoryColor}
            title={expenseGroupedByCategory.categoryName}
            amount={expenseGroupedByCategory.totalFormatted}
          />
        ))}
      </S.Content>
    </S.Container>
  );
}
