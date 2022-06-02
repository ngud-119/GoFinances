import React from "react";
import { FlatList } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { HightlightCard } from "../../components/HighlightCard";
import {
  ITransaction,
  TransactionCard,
} from "../../components/TransactionCard";
import * as S from "./styles";

export interface IFlatListData extends ITransaction {
  id: string;
}

export function Dashboard() {
  const transactions: IFlatListData[] = [
    {
      id: "1",
      type: "positive",
      title: "Desenvolvimento Mobile",
      amount: "R$ 20.000,00",
      category: {
        icon: "dollar-sign",
        name: "Salário",
      },
      date: "29/05/2022",
    },
    {
      id: "2",
      type: "negative",
      title: "Starbucks",
      amount: "R$ 47,00",
      category: {
        icon: "coffee",
        name: "Alimentação",
      },
      date: "29/05/2022",
    },
    {
      id: "3",
      type: "negative",
      title: "McDonalds",
      amount: "R$ 34,90",
      category: {
        icon: "coffee",
        name: "Alimentação",
      },
      date: "29/05/2022",
    },
  ];

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
