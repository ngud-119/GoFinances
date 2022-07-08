import React from "react";
import { Control, Controller } from "react-hook-form";
import { Input, InputProps } from "../Input";

import * as S from "./styles";

interface InputFormProps extends InputProps {
  control: Control;
  name: string;
  error?: string;
}

export function InputForm({ control, name, error, ...rest }: InputFormProps) {
  return (
    <S.Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
        name={name}
      />
      {error && <S.Error>{error}</S.Error>}
    </S.Container>
  );
}
