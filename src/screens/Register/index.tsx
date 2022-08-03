import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Alert, Modal } from "react-native";
import uuid from "react-native-uuid";
import * as Yup from "yup";
import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { InputForm } from "../../components/Forms/InputForm";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";

import { useNavigation } from "@react-navigation/native";
import { useTransactionsStorage } from "../../hooks/useTransactionsStorage";
import { Transaction } from "../../utils/types/transaction";
import * as S from "./styles";

const formSchema = Yup.object().shape({
  name: Yup.string()
    .required("Nome é obrigatório")
    .min(2, "O nome precisa ter, pelo menos, 2 letras."),
  amount: Yup.number()
    .typeError("Preço deve ser um número")
    .required("Preço é obrigatório")
    .positive("O preço deve ser positivo"),
});

interface FormData {
  name: string;
  amount: string;
}

export function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(formSchema),
  });
  const [transactionTypeSelected, setTransactionTypeSelected] = useState<
    "up" | "down" | undefined
  >();
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
    icon: "any",
  });
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const navigation = useNavigation();
  const { addTransactionToStorage } = useTransactionsStorage();

  function handleSelectTransactionType(type: "up" | "down") {
    setTransactionTypeSelected(type);
  }

  function handleCloseSelectCategory() {
    setCategoryModalOpen(false);
  }

  const handleRegister: SubmitHandler<FieldValues | FormData> = async (
    form
  ) => {
    const registerData: Transaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionTypeSelected === "up" ? "positive" : "negative",
      category: category,
      date: new Date(),
    };

    try {
      await addTransactionToStorage(registerData);
      resetFields();

      navigation.navigate("Listagem" as never);
    } catch (error) {
      Alert.alert("Erro", "Houve um erro ao salvar a transação.");
    }
  };

  function resetFields() {
    reset();
    setTransactionTypeSelected(undefined);
    setCategory({
      key: "category",
      name: "Categoria",
      icon: "any",
    });
  }

  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <S.Container>
      <S.Header>
        <S.Title>Cadastro</S.Title>
      </S.Header>

      <S.Form>
        <S.Fields>
          <InputForm
            control={control}
            placeholder="Nome"
            name="name"
            autoCapitalize="sentences"
            autoCorrect={false}
            error={errors.name && String(errors.name.message)}
          />
          <InputForm
            control={control}
            placeholder="Preço"
            name="amount"
            keyboardType="numeric"
            error={errors.amount && String(errors.amount.message)}
          />

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
    // </TouchableWithoutFeedback>
  );
}
