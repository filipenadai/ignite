import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
import { useFocusEffect } from '@react-navigation/core';
import { ActivityIndicator } from 'react-native';
import { useAuth } from '../../hooks/auth';

export interface TransactionProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expansives: HighlightProps
  total: HighlightProps;
}

export function Dashboard() {
  const { signOut, user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<TransactionProps[]>([]);
  const [highlightData, setHightlightData] = useState<HighlightData>({} as HighlightData);

  function getLastTransaction(
    collection: TransactionProps[],
    type: 'positive' | 'negative'
  ) {
    const collectionFiltered =  collection
    .filter(transaction => transaction.type === type);

    if (collectionFiltered.length === 0) {
      return 0
    }

    const lastTransaction = new Date(Math.max.apply(Math, collectionFiltered
      .map(transaction => new Date(transaction.date).getTime())));

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`;
  }

  async function loadTransactions() {
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expansiveTotal = 0;

    const transactionsFormatted: TransactionProps[] = transactions
    .map((item: TransactionProps) => {
      if (item.type === 'positive') {
        entriesTotal += Number(item.amount);
      } else {
        expansiveTotal += Number(item.amount);
      }

      const amount = Number(item.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }).format(new Date(item.date));

      return {
        ...item,
        date,
        amount,
      };
    });

    const lastTransactionEntries = getLastTransaction(transactions, 'positive');
    const lastTransactionExpensives = getLastTransaction(transactions, 'negative');
    const totalInterval =  lastTransactionExpensives === 0 ? 'Não há transações' :  `01 à ${lastTransactionExpensives}`;

    const total = entriesTotal - expansiveTotal;

    setHightlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: lastTransactionEntries === 0 ? 'Não há transações' : `Última entrada dia: ${lastTransactionEntries}`,
      },
      expansives: {
        amount: expansiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: lastTransactionExpensives === 0 ? 'Não há transações' : `Última saída dia: ${lastTransactionExpensives}`,
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: totalInterval,
      },
    })

    setData(transactionsFormatted);

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  return (
    <Container>
      {isLoading ? <ActivityIndicator /> :
        <>
        <Header>
          <UserWrapper>
            <UserInfo>
              <Photo source={{ uri: user.photo }} />
              <User>
                <UserGreeting>
                  Olá,
                </UserGreeting>
                <UserName>
                  {user.name}
                </UserName>
              </User>
            </UserInfo>

            <LogoutButton onPress={signOut}>
              <Icon name="power" />
            </LogoutButton>
          </UserWrapper>
        </Header>

        <HighlightCards>
          <HighlightCard
            title="Entrada"
            amount={highlightData.entries.amount}
            lastTransaction={highlightData.entries.lastTransaction}
            type="up"
          />
          <HighlightCard
            title="Saídas"
            amount={highlightData.expansives.amount}
            lastTransaction={highlightData.expansives.lastTransaction}
            type="down"
          />
          <HighlightCard
            title="Total"
            amount={highlightData.total.amount}
            lastTransaction={highlightData.total.lastTransaction}
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
      </>
    }
    </Container>
  )
}
