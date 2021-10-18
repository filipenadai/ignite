import { Flex, Input, Button, Stack, FormLabel, FormControl } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex h="100vh" w="100vw" justify="center" align="center">
      <Flex as="form" w="100%" maxW={360} bg="gray.800" p="8" flexDir="column" borderRadius="8">
        <Stack spacing="4">

          <FormControl>
            <FormLabel htmlFor="email">E-mail</FormLabel>

            <Input
              name="email"
              type="email"
              id="email"
              focusBorderColor="pink.500"
              bg="gray.900"
              variant="filled"
              _hover={{
                bgColor: 'gray.900'
              }}
              size="lg"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Senha</FormLabel>

            <Input
              name="password"
              id="password"
              type="password"
              focusBorderColor="pink.500"
              bg="gray.900"
              variant="filled"
              _hover={{
                bgColor: 'gray.900'
              }}
              size="lg"
            />
          </FormControl>
        </Stack>

        <Button size="lg" type="submit" mt="6" colorScheme="pink">Entrar</Button>
      </Flex>
    </Flex>
  )
}
