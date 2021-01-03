import React from "react";
import { Center, Heading } from "@chakra-ui/react";
const TitleSection = ({ title }) => {
  return (
    <Center w="50%" height="100%" bg="green.400">
      <Heading as="h1" size="xl" color="white">
        {title}
      </Heading>
    </Center>
  );
};

export default TitleSection;
