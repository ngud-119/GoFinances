import React from "react";
import { TouchableOpacityProps } from "react-native";

import * as S from "./styles";

interface ButtonProps extends TouchableOpacityProps {}

export const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <S.Container>
      <S.Title>{children}</S.Title>
    </S.Container>
  );
};
