import React from "react";
import {
  Flex,
  FormControl,
  Heading,
  FormLabel,
  Input,
  Center,
  FormHelperText,
  Button,
  Link,
  Box,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { REGISTER_MUTATION } from "../graphql/mutation";

const RegisterForm = () => {
  const [registerFn, { error: registerError, loading }] = useMutation(
    REGISTER_MUTATION
  );
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    const { repeat_password, ...args } = data;
    try {
      await registerFn({ variables: { args } });
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
        Sign up
      </Heading>
      <Box w="50%" mt={10} as="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl isDisabled={loading} isInvalid={errors.email}>
          <FormLabel>Email address</FormLabel>
          <Input type="email" name="email" ref={register({ required: true })} />
          <FormHelperText>We'll never share your email.</FormHelperText>
          <FormErrorMessage>Email is required</FormErrorMessage>
        </FormControl>
        <FormControl isDisabled={loading} isInvalid={errors.nick}>
          <FormLabel mt={2}>Nick</FormLabel>
          <Input
            type="text"
            name="nick"
            ref={register({ required: true, minLength: 4, maxLength: 16 })}
          />
          <FormHelperText>Nick to identify you.</FormHelperText>
          <FormErrorMessage>
            {errors.nick && errors.nick.type === "required"
              ? "Nick is required"
              : "Nick must be between 4 and 16 characters"}
          </FormErrorMessage>
        </FormControl>
        <FormControl isDisabled={loading} isInvalid={errors.password}>
          <FormLabel mt={2}>Password</FormLabel>
          <Input
            type="password"
            name="password"
            ref={register({ required: true, minLength: 6, maxLength: 32 })}
          />
          <FormHelperText>Password which is hard to break</FormHelperText>
          <FormErrorMessage>
            {errors.password && errors.password.type === "required"
              ? "Password is required"
              : "Password must be between 6 and 32 characters"}
          </FormErrorMessage>
        </FormControl>
        <FormControl isDisabled={loading} isInvalid={errors.repeat_password}>
          <FormLabel mt={2}>Repeat password</FormLabel>
          <Input
            type="password"
            name="repeat_password"
            ref={register({ required: true, minLength: 6, maxLength: 32 })}
          />
          <FormHelperText>Repeat your password</FormHelperText>
          <FormErrorMessage>
            {errors.repeat_password &&
            errors.repeat_password.type === "required"
              ? "Repeated password is required"
              : "Repeated password must be between 6 and 32 characters"}
          </FormErrorMessage>
        </FormControl>
        <Center mt={5}>
          <Button
            size="lg"
            colorScheme="green"
            type="submit"
            isLoading={loading}
          >
            Sign up
          </Button>
        </Center>
        {registerError && (
          <Center mt={5} fontWeight={700} fontSize="lg">
            <Text color="red.500">{registerError.message}!</Text>
          </Center>
        )}
        <Center mt={5}>
          <Link as={RouterLink} to="/login" color="green.900" fontWeight={500}>
            Already have an account? Log in!
          </Link>
        </Center>
      </Box>
    </Flex>
  );
};

export default RegisterForm;
