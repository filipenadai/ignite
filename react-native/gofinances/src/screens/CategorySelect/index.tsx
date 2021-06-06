import React from 'react';
import { FlatList } from 'react-native';
import { Button } from '../../Components/Form/Button';
import { categories } from '../../utils/categories';

import {
  Container,
  Header,
  Title,
  Category,
  Name,
  Icon,
  Separator,
  Footer,
} from './styles';

interface Category {
  key: string;
  name: string;
}

interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  closeSetCategory: () => void;
}

export function CategorySelect({
  category,
  closeSetCategory,
  setCategory
}: Props) {
  function handleSelectCategory(item: Category) {
    setCategory(item);
  }

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        keyExtractor={item => item.key}
        style={{ width: '100%', flex: 1 }}
        renderItem={({ item }) => (
          <Category
            isActive={category.key === item.key}
            onPress={() => handleSelectCategory(item)}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button title="Selecionar" onPress={closeSetCategory} />
      </Footer>
    </Container>
  );
}
