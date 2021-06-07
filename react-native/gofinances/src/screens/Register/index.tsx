import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { Button } from '../../Components/Form/Button';
import { InputForm } from '../../Components/Form/InputForm';
import { Select } from '../../Components/Form/Select';
import { TransactionTypeButton } from '../../Components/Form/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from './styles';
import { useNavigation } from '@react-navigation/core';

const schema = Yup.object().shape({
  name: Yup
    .string()
    .required('Nome é obrigatório'),
  amount: Yup
    .number()
    .typeError('Informe um valor numérico')
    .positive('O valor precisa ser positivo')
    .required('Valor é obrigatório')
});

interface FormData {
  name: string;
  amount: number;
}

export function Register() {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const { navigate } = useNavigation();

  const dataKey = '@gofinances:transactions';

  const [transactionType, setTransactionType] = useState('');
  const [isSelectCategoryModalOpen, setIsSelectCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleOpenCategorySelectModal() {
    setIsSelectCategoryModalOpen(true);
  }

  function handleCloseCategorySelectModal() {
    setIsSelectCategoryModalOpen(false);
  }

  async function handleSendInfo(data: FormData) {
    if (!transactionType) {
      return Alert.alert('Selecione um tipo de transação');
    }

    if (category.key === 'category') {
      return Alert.alert('Selecione uma categoria');
    }

    const form = {
      id: String(uuid.v4()),
      name: data.name,
      amount: data.amount,
      transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const oldData = data ? JSON.parse(data) : [];

      const newDataFormatted = [
        ...oldData,
        form
      ]
      await AsyncStorage.setItem(dataKey, JSON.stringify(newDataFormatted));

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria',
      });

      navigate('Listagem');

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>
            Cadastro
          </Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              control={control}
              name="name"
              placeholder="Nome"
              error={errors.name && errors.name.message}
            />
            <InputForm
              control={control}
              name="amount"
              placeholder="Preço"
              error={errors.amount && errors.amount.message}
            />
            <TransactionTypes>
              <TransactionTypeButton
                title="Income"
                type="up"
                onPress={() => handleTransactionTypeSelect('up')}
                isActive={transactionType === 'up'}
              />
              <TransactionTypeButton
                title="Outcome"
                type="down"
                onPress={() => handleTransactionTypeSelect('down')}
                isActive={transactionType === 'down'}
              />

            </TransactionTypes>
            <Select title={category.name} onPress={handleOpenCategorySelectModal} />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(handleSendInfo)}/>
        </Form>

        <Modal visible={isSelectCategoryModalOpen}>
          <CategorySelect category={category} setCategory={setCategory} closeSetCategory={handleCloseCategorySelectModal} />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}
