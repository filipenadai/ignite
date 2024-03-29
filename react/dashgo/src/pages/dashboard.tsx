import { Flex, SimpleGrid, Box, Text, theme } from "@chakra-ui/react";
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      '2021-03-07T00:00:00.000Z',
      '2021-03-08T00:00:00.000Z',
      '2021-03-09T00:00:00.000Z',
      '2021-03-10T00:00:00.000Z',
      '2021-03-11T00:00:00.000Z',
      '2021-03-12T00:00:00.000Z',
      '2021-03-13T00:00:00.000Z',
    ]
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3
    }
  }
};

const series = [
  {
    name: 'series1', data: [32, 32, 55, 120, 12, 60, 8]
  }
];

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius="8"
            pb="4"
          >
            <Text fontSize="lg" mb="4">Inscritos da semana</Text>
            <Chart height={160} series={series} options={options} type="area" />
          </Box>

          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius="8"
            pb="4"
          >
            <Text fontSize="lg" mb="4">Taxa de abertura</Text>
            <Chart height={160} series={series} options={options} type="area" />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}
