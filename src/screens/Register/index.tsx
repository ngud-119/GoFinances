import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "react-native";
import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { InputForm } from "../../components/Forms/InputForm";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";

import * as S from "./styles";

interface FormData {
  name: string;
  amount: string;
}

export function Register() {
  const { control, handleSubmit } = useForm();
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

  function handleRegister(form: FormData) {
    const registerData = {
      name: form.name,
      amount: form.amount,
      transactionType: transactionTypeSelected,
      category: category.key,
    };

    console.log(registerData);
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Cadastro</S.Title>
      </S.Header>

      <S.Form>
        <S.Fields>
          <InputForm control={control} placeholder="Nome" name="name" />
          <InputForm control={control} placeholder="Preço" name="amount" />

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

        <Button onPress={handleSubmit(handleRegister)}>Enviar</Button>
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
