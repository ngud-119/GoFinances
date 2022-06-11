import React from "react";
import { TouchableOpacityProps } from "react-native";

import * as S from "./styles";

interface TransactionTypeButtonProps extends TouchableOpacityProps {
  title: string;
  type: "up" | "down";
  isActive: boolean;
}

export function TransactionTypeButton({
  title,
  type,
  isActive,
  ...rest
}: TransactionTypeButtonProps) {
  return (
    <S.Container {...rest} isActive={isActive} type={type}>
      <S.Icon name={`arrow-${type}-circle`} type={type} />
      <S.Title>{title}</S.Title>
    </S.Container>
  );
}
