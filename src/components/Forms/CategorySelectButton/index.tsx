import { GestureResponderEvent } from "react-native";
import * as S from "./styles";

interface CategorySelectProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

export function CategorySelectButton({ title, onPress }: CategorySelectProps) {
  return (
    <S.Container onPress={onPress}>
      <S.Category>{title}</S.Category>

      <S.Icon name="chevron-down" />
    </S.Container>
  );
}
