import React from "react";
import { Box, Flex, Heading, Center } from "@chakra-ui/react";
import HelloUser from "../components/HelloUser";

const Main = () => {
  return (
    <Box height="100vh" w="100%">
      <Flex
        height="50%"
        bg="green.400"
        justify="center"
        align="center"
        direction="column"
      >
        <Heading as="h1" size="3xl" color="white">
          Notedly
        </Heading>
        <Heading as="h4" size="xl" color="teal.50" marginTop={30}>
          Only notes tool you will ever need!
        </Heading>
      </Flex>
      <Flex w="100%" height="45%" justify="center" align="center">
        <Flex width="60%" align="center">
          <HelloUser />
        </Flex>
      </Flex>
      <Center height="5%" w="100%">
        Created by Jakub Sukiennik @2021
      </Center>
    </Box>
  );
};

export default Main;
