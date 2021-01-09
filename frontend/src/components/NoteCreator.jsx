import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { CREATE_NOTE_MUTATION } from "../graphql/mutation";
const NoteCreator = () => {
  const [createNote, { loading }] = useMutation(CREATE_NOTE_MUTATION);
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  const onSave = async (e) => {
    e.preventDefault();
    const data = await createNote({
      variables: { args: { title, content: value } },
    });
    console.log(data);
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
      <Flex padding={5} alignItems="flex-end" w="40%">
        <FormControl id="email" w="70%" isLoading={loading}>
          <FormLabel>Note title</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your post item"
          />
        </FormControl>
        <Spacer />
        <Button type="submit" isLoading={loading}>
          Save
        </Button>
        <Spacer />
        <Button onClick={() => setValue("")} isLoading={loading} type="button">
          Clear
        </Button>
      </Flex>
      <Flex w="100%" h="80%" padding={5} overflow="auto" justify="center">
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
        <Box
          w="45%"
          p={1}
          borderColor="gray.400"
          borderWidth={2}
          borderStyle="solid"
          borderRadius={8}
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
