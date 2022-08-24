import React from "react";
import { HistoryCard } from "../../components/HistoryCard";

import * as S from "./styles";

export function Resume() {
  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo por categoria</S.Title>
      </S.Header>

      <HistoryCard color="red" title="Pizza" amount="R$ 55,00" />
      <HistoryCard color="green" title="Salário" amount="R$ 5500,00" />
    </S.Container>
  );
}
