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
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

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
        <FormControl>
          <FormLabel mt={2}>Email address</FormLabel>
          <Input type="email" name="email" ref={register} />
          <FormHelperText>Pass email given in register process</FormHelperText>
        </FormControl>
        <FormControl mt={2}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            ref={register}
            id="login_password"
          />
          <FormHelperText>
            Pass password given in register process
          </FormHelperText>
        </FormControl>
        <Center mt={5}>
          <Button size="lg" colorScheme="green" type="submit">
            Log in
          </Button>
        </Center>
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
