import React from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { Button } from "../../components/Forms/Button";
import { categories, ICategory } from "../../utils/categories";

import * as S from "./styles";

interface CategorySelectProps {
  category: Omit<ICategory, "color">;
  setCategory: React.Dispatch<React.SetStateAction<Omit<ICategory, "color">>>;
  closeSelectCategory: () => void;
}

export function CategorySelect({
  category,
  setCategory,
  closeSelectCategory,
}: CategorySelectProps) {
  return (
    <S.Container>
      <S.Header>
        <S.Title>Categoria</S.Title>
      </S.Header>

      <FlatList
        data={categories}
        keyExtractor={(item: ICategory) => item.key}
        renderItem={({ item }) => (
          <S.Category
            onPress={() => setCategory(item)}
            isActive={category.key === item.key}
          >
            <S.Icon name={item.icon} />
            <S.Name>{item.name}</S.Name>
          </S.Category>
        )}
        ItemSeparatorComponent={() => <S.Separator />}
      />

      <S.Footer>
        <Button onPress={closeSelectCategory}>Selecionar</Button>
      </S.Footer>
    </S.Container>
  );
}
