import React from "react";
import LoginForm from "../components/LoginForm";
import { Flex, Spacer } from "@chakra-ui/react";
import TitleSection from "../components/TitleSection";

const Login = () => {
  return (
    <Flex w="100%" height="100vh">
      <LoginForm />
      <Spacer />
      <TitleSection title="Explore the notes" />
    </Flex>
  );
};

export default Login;
