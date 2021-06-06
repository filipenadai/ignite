import React from 'react';
import { HighlightCard } from '../../Components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../Components/TransactionCard';

import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  Title,
  Transactions,
  TransactionList,
  LogoutButton,
} from './styles';

export interface TransactionProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: TransactionProps[] = [
    {
      id: '1',
      type: 'positive',
      amount: 'R$ 14.000,00',
      category: { icon: 'dollar-sign', name: 'Venda' },
      date: '06/06/2001',
      title: 'Desenvolvimento de site',
    },
    {
      id: '2',
      type: 'negative',
      amount: 'R$ 59,00',
      category: { icon: 'coffee', name: 'Alimentação' },
      date: '06/06/2001',
      title: 'Hamburgueria Pizzy',
    },
    {
      id: '3',
      type: 'negative',
      amount: 'R$ 1.200,00',
      category: { icon: 'shopping-bag', name: 'Casa' },
      date: '06/06/2001',
      title: 'Aluguel do apartamento',
    },
  ]

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/48576140?v=4' }} />
            <User>
              <UserGreeting>
                Olá,
              </UserGreeting>
              <UserName>
                Nadai
              </UserName>
            </User>
          </UserInfo>

          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          title="Entrada"
          amount="R$ 17.000,30"
          lastTransaction="Última entrada dia 13 de abril"
          type="up"
        />
        <HighlightCard
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
          type="down"
        />
        <HighlightCard
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
          type="total"
        />
      </HighlightCards>

      <Transactions>
        <Title>
          Listagem
        </Title>

        <TransactionList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
          />
      </Transactions>
    </Container>
  )
}
