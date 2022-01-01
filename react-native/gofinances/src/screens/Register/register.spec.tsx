import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { Register } from '.';
import theme from '../../global/styles/theme';
import { AuthProvider } from '../../hooks/auth';

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <AuthProvider>
      {children}
    </AuthProvider>
  </ThemeProvider>
);


describe('Register Screen', () => {
  it('should be open category modal when user click on button', async () => {
    const { getByTestId } = render(
      <Register />,
      {
        wrapper: Providers
      }
    );

    const modalCategory = await waitFor(() => getByTestId('modal-category'));
    const buttonCategory = getByTestId('button-category');
    fireEvent.press(buttonCategory);

    expect(modalCategory.props.visible).toBeTruthy();
  });
});
