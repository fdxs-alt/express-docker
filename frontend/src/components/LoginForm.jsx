import React from "react";
import {
  Flex,
  Heading,
  FormLabel,
  Input,
  Center,
  FormHelperText,
  Button,
  Link,
  Box,
  FormControl,
  FormErrorMessage,
  useToast,
  useMediaQuery,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../graphql/mutation.js";
import { useHistory } from "react-router-dom";
import { useSessionContext } from "../store/SessionStore.jsx";
import { errorToast, successToast } from "../utils/toasts";
const LoginForm = () => {
  const [login, { loading }] = useMutation(LOGIN_MUTATION);
  const { setIsAuth } = useSessionContext();
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const toast = useToast();
  const [isTablet] = useMediaQuery("(max-width: 768px)");

  const onSubmit = async (data) => {
    const args = { ...data };
    try {
      await login({ variables: { args } });
      setIsAuth(true);
      successToast(toast, "You were logged in successfully", "Logged in");
      history.push("/notes");
    } catch (error) {
      errorToast(toast, error);
    }
  };

  return (
    <Flex
      justify="center"
      align="center"
      width={isTablet ? "100%" : "45%"}
      height="100%"
      direction="column"
    >
      <Heading as="h5" size="lg">
        Sign in
      </Heading>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        as="form"
        mt={5}
        width={isTablet ? "80%" : "50%"}
      >
        <FormControl isInvalid={errors.email} isDisabled={loading}>
          <FormLabel mt={2}>Email address</FormLabel>
          <Input type="email" name="email" ref={register({ required: true })} />
          <FormHelperText>Pass email given in register process</FormHelperText>
          <FormErrorMessage>Email is required</FormErrorMessage>
        </FormControl>
        <FormControl mt={2} isInvalid={errors.password} isDisabled={loading}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            ref={register({ required: true })}
            id="login_password"
          />
          <FormHelperText>
            Pass password given in register process
          </FormHelperText>
          <FormErrorMessage>Password is required</FormErrorMessage>
        </FormControl>
        <Center mt={5}>
          <Button
            isLoading={loading}
            size="lg"
            colorScheme="cyan"
            color="white"
            type="submit"
          >
            Log in
          </Button>
        </Center>
        <Center mt={5}>
          <Link
            as={RouterLink}
            to="/register"
            color="cyan.900"
            fontWeight={500}
          >
            Don't have an account? Register!
          </Link>
        </Center>
      </Box>
    </Flex>
  );
};

export default LoginForm;
