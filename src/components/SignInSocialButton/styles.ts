import React, { PropsWithChildren } from "react";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Button = styled(RectButton)<PropsWithChildren<RectButtonProps>>`
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  height: ${RFValue(56)}px;
  margin-bottom: 16px;

  flex-direction: row;
  align-items: center;
`;

export const ImageContainer = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;

  padding: ${RFValue(16)}px;
  border-color: ${({ theme }) => theme.colors.background};
  border-right-width: 1px;
`;

export const Text = styled.Text`
  flex: 1;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.medium};
  padding-right: 16px;
  font-size: ${RFValue(14)}px;
`;
