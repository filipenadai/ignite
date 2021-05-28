import { useCallback, useState } from 'react';
import logoImg from '../../assets/logo.svg';
import { Container, Content } from './styles';

export function Header() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  const handleToggleOpenTransactionModal = useCallback(() => {
    setIsNewTransactionModalOpen(state => !state);
  }, []);

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money"/>
        <button type="button" onClick={handleToggleOpenTransactionModal}>
          Nova transação
        </button>
      </Content>
    </Container>
  )
}
