import React, { useState } from "react";
import { Button } from "../../components/Forms/Button";
import { Input } from "../../components/Forms/Input";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";

import * as S from "./styles";

export function Register() {
  const [transactionTypeSelected, setTransactionTypeSelected] = useState("");

  function handleSelectTransactionType(type: "up" | "down") {
    setTransactionTypeSelected(type);
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Cadastro</S.Title>
      </S.Header>

      <S.Form>
        <S.Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />

          <S.TransactionButtons>
            <TransactionTypeButton
              title="Income"
              type="up"
              onPress={() => handleSelectTransactionType("up")}
              isActive={transactionTypeSelected === "up"}
            />
            <TransactionTypeButton
              title="Outcome"
              type="down"
              onPress={() => handleSelectTransactionType("down")}
              isActive={transactionTypeSelected === "down"}
            />
          </S.TransactionButtons>
        </S.Fields>

        <Button>Enviar</Button>
      </S.Form>
    </S.Container>
  );
}
