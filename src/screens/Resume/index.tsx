import React, { useCallback, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { VictoryPie } from "victory-native";
import { HistoryCard } from "../../components/HistoryCard";
import { useTransactionsStorage } from "../../hooks/useTransactionsStorage";
import { categories } from "../../utils/categories";
import { addMonths, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { useFocusEffect } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import * as S from "./styles";

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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [expensesByCategory, setExpensesByCategory] = useState(
    [] as TotalByCategory[]
  );

  function handleDateChange(action: "forward" | "backward") {
    if (action === "forward") {
      const newDate = addMonths(selectedDate, 1);
      setSelectedDate(newDate);
    } else {
      const newDate = addMonths(selectedDate, -1);
      setSelectedDate(newDate);
    }
  }

  async function loadTransactionFromAsyncStorage() {
    const transactions = await loadTransactions();

    const expenses = transactions.filter(
      (transaction) =>
        transaction.type === "negative" &&
        new Date(transaction.date).getFullYear() ===
          selectedDate.getFullYear() &&
        selectedDate.getMonth() === new Date(transaction.date).getMonth()
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

  useEffect(() => {
    loadTransactionFromAsyncStorage();
  }, [selectedDate]);

  useFocusEffect(
    useCallback(() => {
      loadTransactionFromAsyncStorage();
    }, [])
  );

  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo por categoria</S.Title>
      </S.Header>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{
          padding: 24,
          flexGrow: 1,
        }}
      >
        <S.MonthSelect>
          <S.MonthSelectButton onPress={() => handleDateChange("backward")}>
            <S.MonthSelectIcon name="chevron-left" />
          </S.MonthSelectButton>

          <S.Month>
            {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
          </S.Month>

          <S.MonthSelectButton onPress={() => handleDateChange("forward")}>
            <S.MonthSelectIcon name="chevron-right" />
          </S.MonthSelectButton>
        </S.MonthSelect>

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
      </ScrollView>
    </S.Container>
  );
}
