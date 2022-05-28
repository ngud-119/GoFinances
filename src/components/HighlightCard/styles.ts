import styled, { css } from "styled-components/native";

import Feather from "react-native-vector-icons/Feather";
import { RFValue } from "react-native-responsive-fontsize";

interface ContainerProps {
  type: "up" | "down" | "total";
}
export const Container = styled.View<ContainerProps>`
  background-color: ${({ theme }) => theme.colors.shape};
  width: ${RFValue(270)}px;
  border-radius: 5px;

  padding: 19px 23px ${RFValue(42)}px;
  margin-right: ${RFValue(16)}px;

  ${({ type }) =>
    type === "total" &&
    css`
      background-color: ${({ theme }) => theme.colors.secondary};
    `}
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

type TitleProps = ContainerProps;
export const Title = styled.Text<TitleProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text_inverse};

  ${({ type }) =>
    type === "total" &&
    css`
      color: ${({ theme }) => theme.colors.shape};
    `}
`;

type IconProps = ContainerProps;
export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(40)}px;

  color: ${({ type, theme }) =>
    type === "up"
      ? theme.colors.success
      : type === "down"
      ? theme.colors.attention
      : theme.colors.shape};
`;

export const Footer = styled.View``;

type AmountProps = ContainerProps;
export const Amount = styled.Text<AmountProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  color: ${({ theme }) => theme.colors.text_inverse};
  margin-top: 38px;

  ${({ type }) =>
    type === "total" &&
    css`
      color: ${({ theme }) => theme.colors.shape};
    `}
`;

type LastTransactionProps = ContainerProps;
export const LastTransaction = styled.Text<LastTransactionProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text};

  ${({ type }) =>
    type === "total" &&
    css`
      color: ${({ theme }) => theme.colors.shape};
    `}
`;
