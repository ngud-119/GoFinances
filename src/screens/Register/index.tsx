import React from "react";
import { Button } from "../../components/Forms/Button";
import { Input } from "../../components/Forms/Input";

import * as S from "./styles";

export function Register() {
  return (
    <S.Container>
      <S.Header>
        <S.Title>Cadastro</S.Title>
      </S.Header>

      <S.Form>
        <S.Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
        </S.Fields>

        <Button>Enviar</Button>
      </S.Form>
    </S.Container>
  );
}
