import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title, Icon } from './styles';

interface Props extends RectButtonProps {
  title: string;
}

export function Select({ title, ...props }: Props) {
  return (
    <Container {...props}>
      <Title>{title}</Title>
      <Icon name="chevron-down" />
    </Container>
  )
}
