import { Flex, Text, Box, Avatar } from '@chakra-ui/react';


export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Filipe Nadai</Text>
        <Text color="gray.300" fontSize="small">
          filipe@nadai.dev
        </Text>

      </Box>

      <Avatar size="md" name="Filipe Nadai" src="https://github.com/filipenadai.png" />
    </Flex>
  )
}
