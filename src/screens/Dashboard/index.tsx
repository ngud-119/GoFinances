import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text } from "react-native";
import { HightlightCard } from "../../components/HighlightCard";

import * as S from "./styles";

export function Dashboard() {
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

      <StatusBar style="light" />
    </S.Container>
  );
}
