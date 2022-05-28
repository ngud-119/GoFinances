import React, { useMemo } from "react";

import * as S from "./styles";

interface HightlightCardProps {
  type: "up" | "down" | "total";
  title: string;
  amount: string;
  lastTransaction: string;
}

export function HightlightCard({
  type,
  title,
  amount,
  lastTransaction,
}: HightlightCardProps) {
  const iconName = useMemo(() => {
    if (type === "up") return "arrow-up-circle";
    else if (type === "down") return "arrow-down-circle";

    return "dollar-sign";
  }, [type]);

  return (
    <S.Container type={type}>
      <S.Header>
        <S.Title type={type}>{title}</S.Title>

        <S.Icon name={iconName} type={type} />
      </S.Header>

      <S.Footer>
        <S.Amount type={type}>{amount}</S.Amount>
        <S.LastTransaction type={type}>{lastTransaction}</S.LastTransaction>
      </S.Footer>
    </S.Container>
  );
}
