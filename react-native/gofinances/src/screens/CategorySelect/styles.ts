import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface CategoryProps {
  isActive: boolean;
}

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(112)}px;
  background-color: ${({ theme }) => theme.colors.primary};

  justify-content: flex-end;
  align-items: center;
  padding-bottom: 18px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
`;

export const Category = styled.TouchableOpacity<CategoryProps>`
  width: 100%;
  padding: ${RFValue(15)}px;

  flex-direction: row;
  align-items: center;

  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.secondary_light : theme.colors.background
  };
`;

export const Name = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  margin-right: 16px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`;
