import React from "react";
import {
  Button,
  Flex,
  Heading,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_NOTES_QUERY } from "../graphql/query";
import { LOGOUT_MUTATION } from "../graphql/mutation";
import { Redirect } from "react-router-dom";
import { useNoteStore } from "../store/NoteStore";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { useSessionContext } from "../store/SessionStore";
import { successToast } from "../utils/toasts";
dayjs.extend(relativeTime);
const Sidebar = () => {
  const { data, loading, error } = useQuery(GET_ALL_NOTES_QUERY);
  const { setIsAuth } = useSessionContext();
  const toast = useToast();
  const [logout, { loading: logoutLoading }] = useMutation(LOGOUT_MUTATION);

  const { setSelectedID, resetValues, setEditMode } = useNoteStore();
  if (error) return <Redirect to="/login" />;

  return (
    <Flex
      w="20%"
      p={10}
      mh="100%"
      flexDirection="column"
      overflowY="auto"
      borderColor="cyan.500"
      borderWidth={2}
      borderStyle="solid"
      bg="white"
    >
      <Button
        colorScheme="cyan"
        size="md"
        color="white"
        mb={5}
        onClick={async () =>
          await logout({
            update: async (store) => {
              await store.reset();
              successToast(
                toast,
                "You were log out in successfully",
                "Log out"
              );
              setIsAuth(false);
            },
          })
        }
        isLoading={logoutLoading}
      >
        Log out
      </Button>
      <Button
        onClick={() => {
          setEditMode(true);
          setSelectedID("");
          resetValues();
        }}
        colorScheme="cyan"
        size="md"
        color="white"
        mb={5}
        isLoading={logoutLoading}
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
            borderColor="cyan.500"
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
              colorScheme="cyan"
              size="sm"
              color="white"
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
