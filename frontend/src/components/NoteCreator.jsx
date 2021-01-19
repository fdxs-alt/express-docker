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
  useMediaQuery,
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
  const [isTablet] = useMediaQuery("(max-width: 768px)");
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
      h={isTablet ? "100%" : "80%"}
      padding={isTablet ? 0 : 5}
      overflow="auto"
      flexDirection="column"
      as="form"
      onSubmit={onSave}
      borderColor="cyan.500"
      borderWidth={2}
      borderStyle="solid"
    >
      <Flex
        padding={5}
        alignItems={isTablet ? "center" : "flex-end"}
        w="100%"
        direction={isTablet && "column"}
      >
        <FormControl
          id="email"
          w={isTablet ? "80%" : "40%"}
          isDisabled={loading || updateNoteLoading || deleteNoteLoading}
          mb={isTablet && 2}
        >
          <FormLabel textAlign={isTablet && "center"}>Note title</FormLabel>
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
            mb={isTablet && 2}
            w={isTablet && "60%"}
          >
            {selectedID ? "Update" : "Save"}
          </Button>
        )}

        <Spacer />
        <Button
          w={isTablet && "60%"}
          mb={isTablet && 2}
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
        <FormControl display="flex" w={isTablet ? "60%" : "35%"}>
          <FormLabel htmlFor="preview" margin="auto">
            Edit mode?
          </FormLabel>
          <Switch
            id="email-alerts"
            onChange={() => setEditMode((prev) => !prev)}
            isChecked={editMode}
            margin="auto"
          />
        </FormControl>
      </Flex>
      <Flex
        w="100%"
        h={isTablet ? "100%" : "80%"}
        padding={5}
        overflow="auto"
        justify="center"
        alignItems={isTablet && "center"}
        direction={isTablet && "column"}
      >
        {editMode && (
          <>
            <Textarea
              w={isTablet ? "95%" : "45%"}
              h="100%"
              onChange={(e) => setValue(e.target.value)}
              value={value}
              resize="none"
              placeholder="Type your note here..."
              focusBorderColor="cyan.500"
              borderWidth={2}
            />
            <Divider
              orientation="vertical"
              m="0 40px"
              display={isTablet && "none"}
            />
          </>
        )}
        <Box
          w={isTablet ? "95%" : editMode ? "45%" : "95%"}
          h="100%"
          p={1}
          borderColor="gray.400"
          borderWidth={2}
          borderStyle="solid"
          borderRadius={8}
          overflowY="auto"
          mt={isTablet && 10}
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
