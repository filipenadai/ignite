import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


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

const schema = Yup.object().shape({
  name: Yup
    .string()
    .required('Nome é obrigatório'),
  amount: Yup
    .number()
    .typeError('Informe um valor numérico')
    .positive('O valor precisa ser positivo')
    .required('Valor é obrigatório')
})

export function Register() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

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

  function handleSendInfo(data) {
    console.log(data)
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
