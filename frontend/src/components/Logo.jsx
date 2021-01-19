import React from "react";
import { Center, Heading, useMediaQuery } from "@chakra-ui/react";

const Logo = () => {
  const [isTablet] = useMediaQuery("(max-width: 768px)");
  return (
    <Center bg="cyan.500" w="100%" h="20%" p={20} display={isTablet && "none"}>
      <Heading as="h2" color="white">
        Now it's time to create notes!
      </Heading>
    </Center>
  );
};

export default Logo;
