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
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../graphql/mutation.js";
import { useHistory } from "react-router-dom";
const LoginForm = () => {
  const [login, { error: loginError, loading }] = useMutation(LOGIN_MUTATION);
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const onSubmit = async (data) => {
    const args = { ...data };
    try {
      await login({ variables: { args } });
      history.push("/notes");
    } catch (error) {}
  };

  return (
    <Flex
      justify="center"
      align="center"
      width="45%"
      height="100%"
      direction="column"
    >
      <Heading as="h5" size="lg">
        Sign in
      </Heading>
      <Box onSubmit={handleSubmit(onSubmit)} as="form" mt={5} w="50%">
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
            colorScheme="green"
            type="submit"
          >
            Log in
          </Button>
        </Center>
        {loginError && (
          <Center mt={5} fontWeight={700} fontSize="lg">
            <Text color="red.500">{loginError.message}!</Text>
          </Center>
        )}
        <Center mt={5}>
          <Link
            as={RouterLink}
            to="/register"
            color="green.900"
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
