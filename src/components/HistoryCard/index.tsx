import React from "react";

import * as S from "./styles";

export interface HistoryCardProps {
  title: string;
  color: string;
  amount: string;
}

export const HistoryCard: React.FC<HistoryCardProps> = ({
  title,
  color,
  amount,
}) => {
  return (
    <S.Container color={color}>
      <S.Title>{title}</S.Title>
      <S.Amount>{amount}</S.Amount>
    </S.Container>
  );
};
