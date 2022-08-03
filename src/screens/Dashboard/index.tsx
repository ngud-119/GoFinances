import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { HightlightCard } from "../../components/HighlightCard";
import { TransactionCard } from "../../components/TransactionCard";
import { useTransactionsStorage } from "../../hooks/useTransactionsStorage";
import { TransactionDisplay } from "../../utils/types/transaction";
import * as S from "./styles";

export type IFlatListData = TransactionDisplay;

export function Dashboard() {
  const [transactions, setTransactions] = useState<IFlatListData[]>([]);
  const { loadTransactions } = useTransactionsStorage();

  useEffect(() => {
    async function loadTransactionsOnState() {
      const transactionsStoraged = await loadTransactions();

      if (transactionsStoraged) {
        const transactionsFormmated: IFlatListData[] = transactionsStoraged.map(
          (transaction) => {
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
              category: transaction.category,
              name: transaction.name,
              type: transaction.type,
            };
          }
        );

        setTransactions(transactionsFormmated);
      }
    }

    loadTransactionsOnState();
  }, []);

  return (
    <S.Container>
      <S.Header>
        <S.UserWrapper>
          <S.UserProfile>
            <S.Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/13500056?v=4",
              }}
            />

            <S.WelcomeMessages>
              <S.UserGreeting>Olá,</S.UserGreeting>
              <S.UserName>Walisson!</S.UserName>
            </S.WelcomeMessages>
          </S.UserProfile>

          <S.Icon name="power" />
        </S.UserWrapper>
      </S.Header>

      <S.HightlightCards>
        <HightlightCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HightlightCard
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
        />
        <HightlightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
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
    </S.Container>
  );
}
