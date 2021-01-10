import React from "react";
import { Button, Flex, Heading, Spacer, Spinner, Text } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GET_ALL_NOTES_QUERY } from "../graphql/query";
import { Redirect } from "react-router-dom";
import { useNoteStore } from "../store/NoteStore";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
dayjs.extend(relativeTime);
const Sidebar = () => {
  const { data, loading, error } = useQuery(GET_ALL_NOTES_QUERY);
  const { setSelectedID, resetValues, setEditMode } = useNoteStore();
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
          setEditMode(true);
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
            flexDirection="column"
          >
            <Heading as="h5" size="sm" color="teal.800" wordBreak="break-all">
              {el.title}
            </Heading>

            <Text mt={1}>Updated: {dayjs(el.updatedAt).fromNow()}</Text>
            <Text mt={1}>
              Created: {dayjs(el.createdAt).format("DD/MM/YYYY")}
            </Text>
            <Button
              colorScheme="green"
              size="sm"
              onClick={() => {
                setEditMode(false);
                setSelectedID(el.id);
              }}
              mt={2}
            >
              Select
            </Button>
          </Flex>
        ))}
    </Flex>
  );
};

export default Sidebar;
