import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { useTheme } from "styled-components";
import { HightlightCard } from "../../components/HighlightCard";
import { TransactionCard } from "../../components/TransactionCard";
import { useAuth } from "../../hooks/useAuth";
import { useTransactionsStorage } from "../../hooks/useTransactionsStorage";
import { getLastTransactionDate } from "../../utils/getTransactionDate";
import { TransactionDisplay } from "../../utils/types/transaction";
import * as S from "./styles";

export type IFlatListData = TransactionDisplay;

type HighlightProps = { total: string; lastTransactionDate?: string };
interface HighlightData {
  income: HighlightProps;
  expenses: HighlightProps;
  summary: Required<HighlightProps>;
}

export function Dashboard() {
  const theme = useTheme();
  const { userInfo, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<IFlatListData[]>([]);
  const { loadTransactions } = useTransactionsStorage();
  const [highlightCardData, setHighlightCardData] = useState<HighlightData>(
    {} as HighlightData
  );

  async function loadTransactionsOnState() {
    const transactionsStoraged = await loadTransactions();

    let totalExpenses = 0;
    let totalIncome = 0;

    if (transactionsStoraged) {
      const transactionsFormmated: IFlatListData[] = transactionsStoraged
        .sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        })
        .map((transaction) => {
          if (transaction.type === "positive")
            totalIncome += Number(transaction.amount);
          else totalExpenses += Number(transaction.amount);

          const amount = Number(transaction.amount).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          });
          const date = Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          }).format(new Date(transaction.date));

          return {
            id: transaction.id,
            amount,
            date,
            categoryKey: transaction.categoryKey,
            name: transaction.name,
            type: transaction.type,
          };
        });

      setTransactions(transactionsFormmated);
      setHighlightCardData({
        income: {
          total: totalIncome.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          lastTransactionDate: getLastTransactionDate(
            transactionsFormmated,
            "positive"
          ),
        },
        expenses: {
          total: totalExpenses.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          lastTransactionDate: getLastTransactionDate(
            transactionsFormmated,
            "negative"
          ),
        },
        summary: {
          total: (totalIncome - totalExpenses).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          lastTransactionDate: `Todo o período`,
        },
      });

      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadTransactionsOnState();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactionsOnState();
    }, [])
  );

  return (
    <S.Container>
      <S.Header>
        <S.UserWrapper>
          <S.UserProfile>
            <S.Photo
              source={{
                uri: userInfo.profileImage,
              }}
            />

            <S.WelcomeMessages>
              <S.UserGreeting>Olá,</S.UserGreeting>
              <S.UserName>{userInfo.name}!</S.UserName>
            </S.WelcomeMessages>
          </S.UserProfile>
          <S.Icon name="power" onPress={signOut} />
        </S.UserWrapper>
      </S.Header>

      {isLoading ? (
        <S.ActivityIndicatorContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
          <S.ActivityIndicatorMessage>
            Obtendo transações...
          </S.ActivityIndicatorMessage>
        </S.ActivityIndicatorContainer>
      ) : (
        <>
          <S.HightlightCards>
            <HightlightCard
              type="up"
              title="Entradas"
              amount={`${highlightCardData.income.total}`}
              lastTransaction={
                highlightCardData.income.lastTransactionDate
                  ? `Última entrada dia ${highlightCardData.income.lastTransactionDate}`
                  : ""
              }
            />
            <HightlightCard
              type="down"
              title="Saídas"
              amount={`${highlightCardData.expenses.total}`}
              lastTransaction={
                highlightCardData.expenses.lastTransactionDate
                  ? `Última saída dia ${highlightCardData.expenses.lastTransactionDate}`
                  : ""
              }
            />
            <HightlightCard
              type="total"
              title="Total"
              amount={highlightCardData.summary.total}
              lastTransaction={highlightCardData.summary.lastTransactionDate}
            />
          </S.HightlightCards>

          <S.Transactions>
            <S.Title>Listagem</S.Title>

            <FlatList
              data={transactions}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard {...item} />}
              contentContainerStyle={{ paddingBottom: getBottomSpace() }}
            />
          </S.Transactions>
        </>
      )}
    </S.Container>
  );
}
