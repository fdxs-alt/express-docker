import React from "react";
import LoginForm from "../components/LoginForm";
import { Flex, Spacer, useMediaQuery } from "@chakra-ui/react";
import TitleSection from "../components/TitleSection";

const Login = () => {
  const [isTablet] = useMediaQuery("(max-width: 768px)");
  return (
    <Flex w="100%" height="100vh">
      <LoginForm />
      {!isTablet && <Spacer />}
      {!isTablet && <TitleSection title="Explore the notes" />}
    </Flex>
  );
};

export default Login;
