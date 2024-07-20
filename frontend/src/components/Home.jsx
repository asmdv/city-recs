import React, { useRef, useEffect } from 'react'
import { Box, Text, Heading, Image, Flex, Button } from '@chakra-ui/react';

const HomePage = () => {
  return (
    <Box  height="100vh" width="100vw" mt={8}>
  <video
    autoPlay
    loop
    muted
    style={{
        position: "absolute",
        width: "100vw",
        height: "100%",
        objectFit: "cover",
        left: "0",
        top: "0",
        zIndex: -1,
    }}
    src="/city.mp4"
  />
  <Box
    position="absolute"
    top="50%"
    left="50%"
    transform="translate(-50%, -50%)"
    textAlign="center"
    color="white"
  >
    <Heading fontSize="6xl" mb={8}>Welcome to CityRecs!</Heading>
    <Text fontSize="3xl" mb={8}>
      Choose your dream city of 1000s
    </Text>
  </Box>
</Box>
  );
};

export default HomePage;