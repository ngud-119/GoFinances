import React from "react";
import { TransactionDisplay } from "../../utils/types/transaction";

import * as S from "./styles";

type TransactionCardProps = TransactionDisplay;

export function TransactionCard({
  type,
  name,
  amount,
  category,
  date,
}: TransactionCardProps) {
  return (
    <S.Container>
      <S.Title>{name}</S.Title>

      <S.Amount type={type}>
        {type === "negative" && `- `}
        {amount}
      </S.Amount>

      <S.Footer>
        <S.Category>
          <S.Icon name={category.icon} />
          <S.CategoryName>{category.name}</S.CategoryName>
        </S.Category>

        <S.Date>{date}</S.Date>
      </S.Footer>
    </S.Container>
  );
}
