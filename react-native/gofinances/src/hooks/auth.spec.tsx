import { renderHook, act } from '@testing-library/react-hooks';
import fetchMock from 'jest-fetch-mock';
import { mocked } from 'jest-mock';
import { startAsync } from 'expo-auth-session';

import { AuthProvider, useAuth } from './auth';

fetchMock.enableMocks();

const userTest = {
  id: 'any_id',
  email: 'john.doe@email.com',
  name: 'John Doe',
  photo: 'any_photo.png'
};

jest.mock('expo-auth-session')

describe('Auth Hook', () => {

  it('should be not able to sign if user cancel signin', async () => {
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValue({
      type: 'cancel',
      params: {
        access_token: 'any_token',
      }
    })

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user)
      .not
      .toHaveProperty('id')
  });

  it('should be able to sign in with Google account existing', async () => {
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValue({
      type: 'success',
      params: {
        access_token: 'any_token',
      }
    })
    fetchMock.mockResponse(JSON.stringify(userTest));

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email)
      .toBe(userTest.email);
  });

});
