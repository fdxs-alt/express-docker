import React, { useState } from "react";
import { Divider, Flex, Spacer, Textarea, Box } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import Logo from "../components/Logo";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";

const Notes = () => {
  const [value, setValue] = useState("");
  return (
    <Flex height="100vh" w="100%">
      <Sidebar />
      <Flex w="80%" h="100%" flexDirection="column">
        <Logo />
        <Flex w="100%" h="60%" padding={5} overflow="auto" justify="center">
          <Textarea
            w="45%"
            h="100%"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            resize="none"
          />
          <Divider orientation="vertical" m="0 40px" />
          <Box w="45%">
            <ReactMarkdown children={value} renderers={ChakraUIRenderer()} />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Notes;
