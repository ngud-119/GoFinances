import React, { useState } from "react";
import { Modal } from "react-native";
import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { Input } from "../../components/Forms/Input";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";

import * as S from "./styles";

export function Register() {
  const [transactionTypeSelected, setTransactionTypeSelected] = useState("");
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
    icon: "any",
  });
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  function handleSelectTransactionType(type: "up" | "down") {
    setTransactionTypeSelected(type);
  }

  function handleCloseSelectCategory() {
    setCategoryModalOpen(false);
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

          <CategorySelectButton
            title={category.name}
            onPress={() => setCategoryModalOpen(true)}
          />
        </S.Fields>

        <Button>Enviar</Button>
      </S.Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategory}
        />
      </Modal>
    </S.Container>
  );
}
