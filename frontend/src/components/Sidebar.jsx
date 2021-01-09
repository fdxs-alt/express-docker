import React from "react";
import { Button, Flex, Heading, Spacer, Spinner } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GET_ALL_NOTES_QUERY } from "../graphql/query";
import { Redirect } from "react-router-dom";
import { useNoteStore } from "../store/NoteStore";
const Sidebar = () => {
  const { data, loading, error } = useQuery(GET_ALL_NOTES_QUERY);
  const { setSelectedID, resetValues } = useNoteStore();
  if (error) return <Redirect to="/login" />;

  return (
    <Flex
      w="20%"
      p={10}
      mh="100%"
      flexDirection="column"
      overflowY="auto"
      borderColor="green.400"
      borderWidth={2}
      borderStyle="solid"
      bg="white"
    >
      <Button
        onClick={() => {
          setSelectedID("");
          resetValues();
        }}
        colorScheme="green"
        size="md"
        mb={5}
      >
        Create new note!
      </Button>
      {loading && <Spinner alignSelf="center" justifySelf="center" />}
      {data &&
        data.getUserNotes.map((el) => (
          <Flex
            padding={5}
            borderRadius={8}
            mb={5}
            borderColor="green.400"
            borderWidth={2}
            borderStyle="solid"
            alignItems="center"
            key={el.id}
          >
            <Heading as="h5" size="sm" color="teal.800" wordBreak="break-all">
              {el.title}
            </Heading>
            <Spacer />
            <Button
              colorScheme="green"
              size="sm"
              onClick={() => setSelectedID(el.id)}
              ml={2}
            >
              Select
            </Button>
          </Flex>
        ))}
    </Flex>
  );
};

export default Sidebar;
