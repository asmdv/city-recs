import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    useBreakpointValue,
    Input,
    InputGroup,
    InputRightElement,
  } from "@chakra-ui/react";
  import { useNavigate } from "react-router-dom";
  import React, { useState, useEffect } from "react";
  import { Divider } from "@chakra-ui/react";
  import axios from "axios";
  import { useLocation } from 'react-router-dom';
  
  function Navbar() {
    const isDesktop = useBreakpointValue({
      base: true,
      sm: false,
      md: true,
      lg: true,
    });
    const navigate = useNavigate();

    const location = useLocation();
  
    
    return (
        <Box as="nav" bg="bg-surface" boxShadow="sm" p={2}>
  <Flex align="center" width="100%"> 
    <img
      src="logo.png"
      width="70px"
      alt="Logo"
      style={{ marginLeft: "30px" }}
      onClick={() => navigate("/")}
    />
    {isDesktop && location.pathname !== '/' && (
      <Flex justify="flex-start" flex="1" marginLeft="30px"> {/* Align buttons to the left */}
        <ButtonGroup variant="link" spacing="8">
          <Button key="Home" onClick={() => navigate('/')} variant="ghost">Home</Button>
          <Button key="Quiz" onClick={() => navigate('/quiz')} variant="ghost">Quiz</Button>
          <Button key="History" onClick={() => navigate('/history')} variant="ghost">History</Button>
        </ButtonGroup>
      </Flex>
    ) }
    {isDesktop && location.pathname === '/' && (
      <Flex justify="flex-start" flex="1" marginLeft="30px"> {/* Align buttons to the left */}
        <ButtonGroup variant="link" spacing="8">
          <Button key="Home" onClick={() => navigate('/')} variant="ghost" color="white" _hover={{ bg: 'black' }} >Home</Button>
          <Button key="Quiz" onClick={() => navigate('/quiz')} variant="ghost" color="white" _hover={{ bg: 'black' }}>Quiz</Button>
          <Button key="History" onClick={() => navigate('/history')} variant="ghost" color="white" _hover={{ bg: 'black' }}>History</Button>
        </ButtonGroup>
      </Flex>
    ) }
  </Flex>
</Box>
    );
  }
  
  export default Navbar;