export const errorToast = (toast, error) => {
  return toast({
    title: "Error",
    description: error.message,
    status: "error",
    duration: 5000,
    isClosable: true,
  });
};

export const successToast = (toast, message, title) => {
  return toast({
    title: title,
    description: message,
    status: "success",
    duration: 5000,
    isClosable: true,
  });
};
