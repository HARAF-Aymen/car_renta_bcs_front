import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react';
import { JSX } from 'react';

interface StatCardProps {
  icon: JSX.Element;
  label: string;
  value: string | number;
  bg: string;
}

const StatCard = ({ icon, label, value, bg }: StatCardProps) => {
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <Flex
      p={5}
      bg={cardBg}
      borderRadius="xl"
      boxShadow="sm"
      align="center"
      gap={4}
      _hover={{ boxShadow: 'md' }}
      transition="all 0.2s"
      border="1px solid"
      borderColor="gray.100"
    >
      <Box p={3} bg={bg} borderRadius="full">
        {icon}
      </Box>
      <Box>
        <Text fontSize="sm" color="gray.500" mb={1}>
          {label}
        </Text>
        <Text fontSize="2xl" fontWeight="semibold" color="gray.800">
          {value}
        </Text>
      </Box>
    </Flex>
  );
};

export { StatCard };
