import React, { useRef, useEffect } from 'react'
import { Box, Text, Heading, Image, Flex, Button } from '@chakra-ui/react';

const HomePage = () => {
  return (
    <Box position="relative" height="90vh" width="93.5vw" overflow="hidden" mt={8}>
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          width: "100%",
          left: "50%",
          top: "50%",
          height: "100%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
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