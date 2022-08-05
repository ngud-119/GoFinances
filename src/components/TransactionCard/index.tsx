import React, { useMemo } from "react";
import { categories } from "../../utils/categories";
import { TransactionDisplay } from "../../utils/types/transaction";

import * as S from "./styles";

type TransactionCardProps = TransactionDisplay;

export function TransactionCard({
  type,
  name,
  amount,
  categoryKey,
  date,
}: TransactionCardProps) {
  const categoryData = useMemo(() => {
    return categories.find((category) => category.key === categoryKey);
  }, [categoryKey]);

  return (
    <S.Container>
      <S.Title>{name}</S.Title>

      <S.Amount type={type}>
        {type === "negative" && `- `}
        {amount}
      </S.Amount>

      <S.Footer>
        <S.Category>
          <S.Icon name={categoryData?.icon || "dollar-sign"} />
          <S.CategoryName>{categoryData?.name || "-"}</S.CategoryName>
        </S.Category>

        <S.Date>{date}</S.Date>
      </S.Footer>
    </S.Container>
  );
}
