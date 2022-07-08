import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
`;

export const Error = styled.Text`
  /* height: ${RFValue(20)}px; */
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.attention};
  margin: 0 7px 14px;
`;
