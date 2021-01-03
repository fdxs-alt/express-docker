import React from "react";
import RegisterForm from "../components/RegisterForm";
import { Flex, Spacer } from "@chakra-ui/react";
import TitleSection from "../components/TitleSection";
const Register = () => {
  return (
    <Flex w="100%" height="100vh">
      <TitleSection title="Notes are waiting to be written" />
      <Spacer />
      <RegisterForm />
    </Flex>
  );
};

export default Register;
