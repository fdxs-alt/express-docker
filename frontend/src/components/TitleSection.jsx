import React from "react";
import { Center, Heading } from "@chakra-ui/react";
const TitleSection = ({ title }) => {
  return (
    <Center w="50%" height="100%" bg="cyan.500">
      <Heading as="h1" size="xl" color="white" p={5}>
        {title}
      </Heading>
    </Center>
  );
};

export default TitleSection;
