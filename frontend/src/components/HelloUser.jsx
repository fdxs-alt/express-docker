import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_QUERY } from "../graphql/query";
import { Link as RouterLink } from "react-router-dom";
import { Link, Spacer, Text, Spinner, Flex, Center } from "@chakra-ui/react";
const HelloUser = () => {
  const { data, loading, error } = useQuery(GET_USER_QUERY);

  if (loading) {
    return (
      <Center w="100%">
        <Spinner size="xl" />;
      </Center>
    );
  }

  return (
    <>
      {data && (
        <Flex
          justifySelf="center"
          textAlign="center"
          w="100%"
          flexDirection="column"
        >
          <Text fontSize="3xl" color="teal.600">
            Hello <strong>{data.getUser.nick}!</strong>
          </Text>
          <Link fontSize={20} color="teal.800" to={"/notes"} as={RouterLink}>
            See your notes now!
          </Link>
        </Flex>
      )}
      {error && (
        <>
          <Link
            as={RouterLink}
            to="/login"
            size="lg"
            fontSize={30}
            color="teal.800"
            fontWeight={500}
          >
            Sign in!
          </Link>
          <Spacer />
          <Link
            as={RouterLink}
            to="/register"
            fontSize={30}
            color="teal.800"
            fontWeight={500}
          >
            Sign up!
          </Link>
        </>
      )}
    </>
  );
};

export default HelloUser;
