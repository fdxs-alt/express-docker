import React from "react";
import { Box, Spacer, Flex, Heading, Link, Center } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
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
          <Link
            as={RouterLink}
            to="/login"
            size="lg"
            fontSize={30}
            color="teal.800"
            fontWeight={500}
          >
            Sign in!
          </Link>
          <Spacer />
          <Link
            as={RouterLink}
            to="/register"
            fontSize={30}
            color="teal.800"
            fontWeight={500}
          >
            Sign up!
          </Link>
        </Flex>
      </Flex>
      <Center height="5%" w="100%">
        Created by Jakub Sukiennik @2020
      </Center>
    </Box>
  );
};

export default Main;
