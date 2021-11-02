import { Flex, Text, Box, Avatar } from '@chakra-ui/react';

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true  }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Filipe Nadai</Text>
          <Text color="gray.300" fontSize="small">
            filipe@nadai.dev
          </Text>

        </Box>
      )}
      <Avatar size="md" name="Filipe Nadai" src="https://github.com/filipenadai.png" />
    </Flex>
  )
}
