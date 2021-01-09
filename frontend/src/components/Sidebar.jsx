import React from "react";
import { Center, Flex, Spinner } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GET_ALL_NOTES_QUERY } from "../graphql/query";
const Sidebar = () => {
  const { data, loading, error } = useQuery(GET_ALL_NOTES_QUERY);

  return (
    <Flex
      w="20%"
      p={10}
      mh="100%"
      bg="white"
      flexDirection="column"
      overflowY="auto"
      borderColor="green.400"
      borderWidth={2}
      borderStyle="solid"
    >
      {loading && (
        <Center>
          <Spinner />
        </Center>
      )}
    </Flex>
  );
};

export default Sidebar;
