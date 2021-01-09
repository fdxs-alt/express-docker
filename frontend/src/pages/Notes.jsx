import React, { useState } from "react";
import { Divider, Flex, Spacer, Textarea, Box } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import Logo from "../components/Logo";
import NoteCreator from "../components/NoteCreator";

const Notes = () => {
  const [selectedNoteID, setSelectedNoteID] = useState("");

  return (
    <Flex height="100vh" w="100%">
      <Sidebar />
      <Flex w="80%" h="100%" flexDirection="column">
        <Logo />
        <NoteCreator />
      </Flex>
    </Flex>
  );
};

export default Notes;
