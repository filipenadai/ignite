import React, { useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { SignInSocialButton } from '../../Components/SignInSocialButton';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from './styles';

export function SignIn() {
  const { signInWithGoogle, signInWithApple } = useAuth();
  const { colors } = useTheme();

  const [isLoading, setIsLoading] = useState(false);

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (err) {
      console.log(err);
      Alert.alert('Não foi possivel acessar a conta do Google!');
      setIsLoading(false);
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      return await signInWithApple();
    } catch (err) {
      console.log(err);
      Alert.alert('Não foi possivel acessar a conta do Apple!');
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg
            width={RFValue(120)}
            height={RFValue(68)}
          />

          <Title>
            Controle de suas {'\n'}
            finanças de forma {'\n'}
            muito simples
          </Title>
        </TitleWrapper>
        <SignInTitle>
          Faça seu login com {'\n'}
          umas das contas abaixo
        </SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          {Platform.OS === 'ios' && <SignInSocialButton
            svg={AppleSvg}
            title="Entrar com Apple"
            onPress={handleSignInWithApple}
          />}
          <SignInSocialButton
            svg={GoogleSvg}
            title="Entrar com Google"
            onPress={handleSignInWithGoogle}
          />
        </FooterWrapper>

        {isLoading && <ActivityIndicator size="small" color={colors.shape} style={{ marginTop: 18 }} />}
      </Footer>
    </Container>
  )
}
