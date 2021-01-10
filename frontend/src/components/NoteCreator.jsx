import React from "react";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import {
  Divider,
  Flex,
  Textarea,
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Spacer,
  Switch,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import {
  CREATE_NOTE_MUTATION,
  UPDATE_NOTE_MUTATION,
  DELETE_NOTE_MUTATION,
} from "../graphql/mutation";
import { GET_ALL_NOTES_QUERY } from "../graphql/query";
import { useNoteStore } from "../store/NoteStore";

const NoteCreator = () => {
  const {
    selectedID,
    value,
    title,
    setSelectedID,
    setTitle,
    setValue,
    resetValues,
    editMode,
    setEditMode,
  } = useNoteStore();
  const [createNote, { loading }] = useMutation(CREATE_NOTE_MUTATION);

  const [updateNote, { loading: updateNoteLoading }] = useMutation(
    UPDATE_NOTE_MUTATION
  );

  const [deleteNote, { loading: deleteNoteLoading }] = useMutation(
    DELETE_NOTE_MUTATION
  );

  const onSave = async (e) => {
    e.preventDefault();

    if (!title || !value) {
      return;
    }

    if (!selectedID) {
      await createNote({
        variables: { args: { title, content: value } },
        update: (store, { data: newNoteData }) => {
          const prevNotes = store.readQuery({ query: GET_ALL_NOTES_QUERY });
          store.writeQuery({
            query: GET_ALL_NOTES_QUERY,
            data: { getUserNotes: [prevNotes, newNoteData] },
          });
          setSelectedID(newNoteData.createNote.id);
          setEditMode(false);
        },
      });
    } else {
      await updateNote({
        variables: { args: { title, content: value, id: selectedID } },
      });
      setEditMode(false);
    }
  };

  return (
    <Flex
      w="100%"
      h="80%"
      padding={5}
      overflow="auto"
      flexDirection="column"
      as="form"
      onSubmit={onSave}
      borderColor="green.400"
      borderWidth={2}
      borderStyle="solid"
    >
      <Flex padding={5} alignItems="flex-end" w="100%">
        <FormControl
          id="email"
          w="40%"
          isDisabled={loading || updateNoteLoading || deleteNoteLoading}
        >
          <FormLabel>Note title</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your note title"
          />
        </FormControl>
        <Spacer />
        {editMode && (
          <Button
            type="submit"
            isLoading={loading || updateNoteLoading || deleteNoteLoading}
          >
            {selectedID ? "Update" : "Save"}
          </Button>
        )}

        <Spacer />
        <Button
          onClick={async () => {
            if (!selectedID) {
              setValue("");
            } else {
              await deleteNote({
                variables: { id: selectedID },
                update: (store) => {
                  const prevNotes = store.readQuery({
                    query: GET_ALL_NOTES_QUERY,
                  });

                  store.writeQuery({
                    query: GET_ALL_NOTES_QUERY,
                    data: {
                      getUserNotes: [
                        ...prevNotes.getUserNotes.filter(
                          (el) => el.id !== selectedID
                        ),
                      ],
                    },
                  });
                },
              });
              setSelectedID();
              setEditMode(true);
              resetValues();
            }
          }}
          isLoading={loading || updateNoteLoading || deleteNoteLoading}
          type="button"
        >
          {selectedID ? "Delete" : "Clear"}
        </Button>
        <Spacer />
        <FormControl display="flex" w="35%">
          <FormLabel htmlFor="preview">Edit mode?</FormLabel>
          <Switch
            id="email-alerts"
            onChange={() => setEditMode((prev) => !prev)}
            isChecked={editMode}
          />
        </FormControl>
      </Flex>
      <Flex w="100%" h="80%" padding={5} overflow="auto" justify="center">
        {editMode && (
          <>
            <Textarea
              w="45%"
              h="100%"
              onChange={(e) => setValue(e.target.value)}
              value={value}
              resize="none"
              placeholder="Type your note here..."
              focusBorderColor="green.400"
              borderWidth={2}
            />
            <Divider orientation="vertical" m="0 40px" />
          </>
        )}
        <Box
          w={editMode ? `45%` : `100%`}
          p={1}
          borderColor="gray.400"
          borderWidth={2}
          borderStyle="solid"
          borderRadius={8}
          overflowY="auto"
        >
          <ReactMarkdown
            children={value}
            renderers={ChakraUIRenderer()}
            skipHtml={false}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default NoteCreator;
