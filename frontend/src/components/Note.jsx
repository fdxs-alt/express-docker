import React from "react";
import NoteCreator from "./NoteCreator";
import { GET_SPECIFIC_NOTE_QUERY } from "../graphql/query";
import { useQuery } from "@apollo/client";
import { Center, Spinner } from "@chakra-ui/react";
import { Redirect } from "react-router-dom";
import { useNoteStore } from "../store/NoteStore";
const Note = () => {
  const { selectedID: id, setValues } = useNoteStore();
  const { loading, error } = useQuery(GET_SPECIFIC_NOTE_QUERY, {
    skip: id ? false : true,
    variables: { id },
    fetchPolicy: "cache-and-network",
    onCompleted: ({ getSpecificNote }) => {
      setValues(getSpecificNote.title, getSpecificNote.content);
    },
  });

  if (loading) {
    return (
      <Center w="100%" h="80%">
        <Spinner />
      </Center>
    );
  }
  if (error) {
    return <Redirect to="/login" />;
  }
  return <NoteCreator />;
};

export default Note;
