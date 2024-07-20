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
  
  function Navbar() {
    const isDesktop = useBreakpointValue({
      base: true,
      sm: false,
      md: true,
      lg: true,
    });
    const navigate = useNavigate();
  
    
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
    {isDesktop ? (
      <Flex justify="flex-start" flex="1" marginLeft="30px"> {/* Align buttons to the left */}
        <ButtonGroup variant="link" spacing="8">
          <Button key="Home" onClick={() => navigate('/')} variant="ghost">Home</Button>
          <Button key="Quiz" onClick={() => navigate('/quiz')} variant="ghost">Quiz</Button>
          <Button key="History" onClick={() => navigate('/history')} variant="ghost">History</Button>
        </ButtonGroup>
      </Flex>
    ) : (
      <IconButton 
        alignSelf="center"
        marginLeft="auto"
        marginRight="10px"
        variant="ghost"
        icon={<span style={{ fontSize: "1.25rem" }}>☰</span>} 
        aria-label="Open Menu"
      />
    )}
  </Flex>
</Box>
    );
  }
  
  export default Navbar;