import React from "react";

import GoogleLogo from "../../assets/google-logo.svg";
import AppLogo from "../../assets/gofinances-logo.svg";

import * as S from "./styles";
import { RFValue } from "react-native-responsive-fontsize";
import { SignInSocialButton } from "../../components/SignInSocialButton";

export const SignIn = () => {
  return (
    <S.Container>
      <S.Header>
        <S.TitleWrapper>
          <AppLogo width={RFValue(120)} height={RFValue(68)} />

          <S.Title>
            Controle suas {"\n"}finanças de forma {"\n"}muito simples
          </S.Title>
        </S.TitleWrapper>

        <S.SignInTitle>
          Faça seu login com{"\n"}uma das contas abaixo
        </S.SignInTitle>
      </S.Header>

      <S.Footer>
        <S.FooterWrapper>
          <SignInSocialButton
            logo={GoogleLogo}
            title="Entrar com o Google"
            provider="google"
          />
        </S.FooterWrapper>
      </S.Footer>
    </S.Container>
  );
};
