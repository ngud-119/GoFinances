import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { HistoryCardProps } from ".";

interface ContainerProps {
  color: HistoryCardProps["color"];
}
export const Container = styled.View<ContainerProps>`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  border-color: ${({ color }) => color};
  border-left-width: 5px;
  padding: 13px 24px;
  margin-bottom: 8px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;
`;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(15)}px;
`;
