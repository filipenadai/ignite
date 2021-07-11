import React from 'react';

import {
  Container,
  Amount,
  Title,
} from './styles';

interface Props {
  amount: string;
  title: string;
  color: string;
}

export function HistoryCard({
  title,
  color,
  amount,
}: Props) {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
}
