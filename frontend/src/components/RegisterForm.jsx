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
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
const RegisterForm = () => {
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
        Sign up
      </Heading>
      <Box w="50%" mt={10} as="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" name="email" ref={register} />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel mt={2}>Nick</FormLabel>
          <Input type="text" name="nick" ref={register} />
          <FormHelperText>Nick to identify you.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel mt={2}>Password</FormLabel>
          <Input type="password" name="password" ref={register} />
          <FormHelperText>Password which is hard to break</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel mt={2}>Repeat password</FormLabel>
          <Input type="password" name="repeat-password" ref={register} />
          <FormHelperText>Repeat your password</FormHelperText>\
        </FormControl>
        <Center mt={5}>
          <Button size="lg" colorScheme="green" type="submit">
            Sign up
          </Button>
        </Center>
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
