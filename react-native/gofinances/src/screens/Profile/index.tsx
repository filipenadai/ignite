import React from 'react';
import { Button, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export function Profile() {
  return (
    <View>
      <Text testID="text-title">Perfil</Text>

      <TextInput
        testID="input-name"
        placeholder="Nome"
        autoCorrect={false}
        value="Filipe"
      />

      <TextInput
        testID="input-surname"
        placeholder="Sobrenome"
        value="Nadai"
      />

      <Button
        title="Salvar"
        onPress={() => {}}
      />
    </View>
  )
}
