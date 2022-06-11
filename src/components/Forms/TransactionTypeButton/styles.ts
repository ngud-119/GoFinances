import styled, { css } from "styled-components/native";

import Feather from "react-native-vector-icons/Feather";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface ContainerProps {
  isActive: boolean;
  type: "up" | "down";
}
export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 48%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px 0;

  border-width: ${({ isActive }) => (isActive ? 0 : 1.5)}px;
  border-style: solid;
  border-color: #d9d9d9;
  border-radius: 5px;

  ${({ isActive, type }) =>
    isActive &&
    type === "up" &&
    css`
      background-color: ${({ theme }) => theme.colors.success_light};
    `}

  ${({ isActive, type }) =>
    isActive &&
    type === "down" &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_light};
    `}
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-left: 12px;
`;

interface IconProps {
  type: "up" | "down";
}
export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;

  color: ${({ theme, type }) =>
    type === "down" ? theme.colors.attention : theme.colors.success};
`;
