import React from 'react';

import { Container, Title, Icon } from './styles';

interface Props {
  title: string;
}

export function Select({ title }: Props) {
  return (
    <Container>
      <Title>{title}</Title>
      <Icon name="chevron-down" />
    </Container>
  )
}
