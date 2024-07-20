import React from 'react'
import {  Box, Button, FormControl, FormLabel, Input, Stack, Text, Select, Progress } from '@chakra-ui/react';
import { useState } from 'react';
import Output from './Output';

export default function Quiz() {


  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isOther, setIsOther] = useState(false);
  const [formData, setFormData] = useState({
    occupation: '',
    location: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
    // You can add form submission logic here
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <FormControl id="occupation">
            <FormLabel>Occupation</FormLabel>
            <Select value={formData.occupation} onChange={handleChange} placeholder="Select your occupation">
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Manager">Manager</option>
                <option value="Other">Other</option>
              </Select>
              {isOther && (
              <FormControl id="customOccupation" isRequired>
                <FormLabel>Custom Occupation</FormLabel>
                <Input type="text" value={formData.customOccupation} onChange={handleChange} placeholder="Enter your occupation" />
              </FormControl>
            )}
          </FormControl>
        );
      case 1:
        return (
          <FormControl id="location" >
            <FormLabel>Location</FormLabel>
            <Select value={formData.location} onChange={handleChange} placeholder="Select your location">
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Chicago">Chicago</option>
              <option value="Houston">Houston</option>
              <option value="Phoenix">Phoenix</option>
            </Select>
          </FormControl>
        );
      case 2:
        return (
          <FormControl id="mbti">
            <FormLabel>MBTI</FormLabel>
            <Select value={formData.mbti} onChange={handleChange} placeholder="Select your MBTI">
              <option value="INTJ">INTJ</option>
              <option value="INTP">INTP</option>
              <option value="ENTJ">ENTJ</option>
              <option value="ENTP">ENTP</option>
              <option value="INFJ">INFJ</option>
              <option value="INFP">INFP</option>
              <option value="ENFJ">ENFJ</option>
              <option value="ENFP">ENFP</option>
              <option value="ISTJ">ISTJ</option>
              <option value="ISFJ">ISFJ</option>
              <option value="ESTJ">ESTJ</option>
              <option value="ESFJ">ESFJ</option>
              <option value="ISTP">ISTP</option>
              <option value="ISFP">ISFP</option>
              <option value="ESTP">ESTP</option>
              <option value="ESFP">ESFP</option>
            </Select>
          </FormControl>
        );
      default:
        return (
          <Text>Thank you! Your form has been submitted.</Text>
        );
    }
  };






  return (
    <div>
      {!submitted ? (
   <Box width="100%" maxWidth="500px" mx="auto" mt={10} p={5} borderWidth="1px" borderRadius="lg">
   <Progress value={(step / 2) * 100} mb={4} mt={3}/>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            {renderStep()}

            <Stack direction="row" spacing={4}>
              {step > 0 && (
                <Button onClick={handlePrev} colorScheme="blue" size="md">Previous</Button>
              )}
              {step < 2 && (
                <Button onClick={handleNext} colorScheme="blue" size="md">Next</Button>
              )}
              {step === 2 && (
                <Button type="submit" colorScheme="blue" size="md">Submit</Button>
              )}
            </Stack>
          </Stack>
        </form>
        
        
      </Box>) : (
      <Box width="100%" maxWidth="500px" mx="auto" mt={10} p={5} borderWidth="1px" borderRadius="lg">
        <Output city="Seattle" image="https://wallpaperaccess.com/full/123595.jpg" text="This is Seattle." landmark="https://th.bing.com/th/id/OIP.7aGjEmFjl6U2oB6MKVFlYAHaLH?rs=1&pid=ImgDetMain"/>
        </Box>)
        }
      
      </div>
  )
}
