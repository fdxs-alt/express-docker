import React from "react";
import { Center, Heading } from "@chakra-ui/react";

const Logo = () => {
  return (
    <Center bg="cyan.500" w="100%" h="20%" p={20}>
      <Heading as="h2" color="white">
        Now it's time to create notes!
      </Heading>
    </Center>
  );
};

export default Logo;
