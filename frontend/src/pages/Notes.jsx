import React from "react";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import Logo from "../components/Logo";
import Note from "../components/Note";

const Notes = () => {
  const [isTablet] = useMediaQuery("(max-width: 768px)");
  return (
    <Flex height="100vh" w="100%">
      <Sidebar />
      <Flex w={isTablet ? "65%" : "80%"} h="100%" flexDirection="column">
        <Logo />
        <Note />
      </Flex>
    </Flex>
  );
};

export default Notes;
