import React from 'react';
import { TextInputProps } from 'react-native';

import { Container } from './styles';

interface Props extends TextInputProps {
  active?: boolean;
};

export function Input({ active = false, ...props}: Props) {
  return (
    <Container active={active} {...props} />
  )
}
