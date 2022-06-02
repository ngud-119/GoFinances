import React from "react";
import { Input } from "../../components/Forms/Input";

import * as S from "./styles";

export function Register() {
  return (
    <S.Container>
      <S.Header>
        <S.Title>Cadastro</S.Title>
      </S.Header>

      <S.Form>
        <Input placeholder="Nome" />
        <Input placeholder="Preço" />
      </S.Form>
    </S.Container>
  );
}
