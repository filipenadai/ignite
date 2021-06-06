import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

interface TypeProps {
  type: 'up' | 'down';
}

interface ActiveProps {
  isActive: boolean;
  type: 'up' | 'down';
}

export const Container = styled(RectButton)<ActiveProps>`
  width: 48%;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  border: 1.5px solid ${({ theme }) => theme.colors.text};
  border-radius: 5px;

  padding: ${RFValue(16)}px 0;

  ${({ isActive, type, theme }) => isActive && type === 'up' && css`
    border-width: 0;
    background-color: ${theme.colors.success_light};
  `};

  ${({ isActive, type, theme }) => isActive && type === 'down' && css`
    border-width: 0;
    background-color: ${theme.colors.attention_light};
  `};
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(24)}px;
  margin-right: ${RFValue(12)}px;

  color: ${({ theme, type }) => type === 'up' ? theme.colors.success : theme.colors.attention}
`;
