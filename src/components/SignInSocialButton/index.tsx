import React from "react";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";
import * as S from "./styles";

interface SignInSocialButtonProps extends RectButtonProps {
  title: string;
  logo: React.FC<SvgProps>;
}

export const SignInSocialButton: React.FC<SignInSocialButtonProps> = ({
  title,
  logo: LogoSvg,
  ...rest
}) => {
  return (
    <S.Button {...rest}>
      <S.ImageContainer>
        <LogoSvg />
      </S.ImageContainer>

      <S.Text>{title}</S.Text>
    </S.Button>
  );
};
