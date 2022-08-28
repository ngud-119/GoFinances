import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";
import { useAuth } from "../../hooks/useAuth";
import * as S from "./styles";

export type OAuthProvider = "google";

interface SignInSocialButtonProps extends RectButtonProps {
  title: string;
  logo: React.FC<SvgProps>;
  provider: OAuthProvider;
}

export const SignInSocialButton: React.FC<SignInSocialButtonProps> = ({
  title,
  logo: LogoSvg,
  provider,
  ...rest
}) => {
  const { signIn } = useAuth();

  return (
    <S.Button {...rest} onPress={() => signIn(provider)}>
      <S.ImageContainer>
        <LogoSvg />
      </S.ImageContainer>

      <S.Text>{title}</S.Text>
    </S.Button>
  );
};
