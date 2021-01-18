import React from "react";
import RegisterForm from "../components/RegisterForm";
import { Flex, Spacer, useMediaQuery } from "@chakra-ui/react";
import TitleSection from "../components/TitleSection";
const Register = () => {
  const [isTablet] = useMediaQuery("(max-width: 768px)");
  return (
    <Flex w="100%" height="100vh">
      {!isTablet && <TitleSection title="Notes are waiting to be written" />}
      {!isTablet && <Spacer />}
      <RegisterForm />
    </Flex>
  );
};

export default Register;
