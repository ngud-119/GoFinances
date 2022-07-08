import React from "react";
import { TextInputProps } from "react-native";

import * as S from "./styles";

export type InputProps = TextInputProps;

export function Input({ ...props }: InputProps) {
  return <S.Container {...props}></S.Container>;
}
