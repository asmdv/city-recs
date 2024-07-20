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
    music: '',
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
              <option value="Accountant">Accountant</option>
              <option value="Actor">Actor</option>
              <option value="Artist">Artist</option>
              <option value="Athlete">Athlete</option>
              <option value="Chef">Chef</option>
              <option value="Designer">Designer</option>
              <option value="Developer">Developer</option>
              <option value="Doctor">Doctor</option>
              <option value="Engineer">Engineer</option>
              <option value="Entrepreneur">Entrepreneur</option>
              <option value="Firefighter">Firefighter</option>
              <option value="Lawyer">Lawyer</option>
              <option value="Manager">Manager</option>
              <option value="Mechanic">Mechanic</option>
              <option value="Musician">Musician</option>
              <option value="Nurse">Nurse</option>
              <option value="Pharmacist">Pharmacist</option>
              <option value="Pilot">Pilot</option>
              <option value="Police Officer">Police Officer</option>
              <option value="Politician">Politician</option>
              <option value="Salesperson">Salesperson</option>
              <option value="Scientist">Scientist</option>
              <option value="Social Worker">Social Worker</option>
              <option value="Teacher">Teacher</option>
              <option value="Veterinarian">Veterinarian</option>
              <option value="Writer">Writer</option>
            </Select>
          </FormControl>
        );
      case 1:
        return (
          <FormControl id="music" >
            <FormLabel>Music Taste</FormLabel>
            <Select value={formData.music} onChange={handleChange} placeholder="Select your music taste">
            <option value="Blues">Blues</option>
            <option value="Classical">Classical</option>
            <option value="Country">Country</option>
            <option value="Electronic">Electronic</option>
            <option value="Folk">Folk</option>
            <option value="Hip-Hop">Hip-Hop</option>
            <option value="Indie">Indie</option>
            <option value="Jazz">Jazz</option>
            <option value="K-Pop">K-Pop</option>
            <option value="Metal">Metal</option>
            <option value="Pop">Pop</option>
            <option value="Punk">Punk</option>
            <option value="R&B">R&B</option>
            <option value="Reggae">Reggae</option>
            <option value="Rock">Rock</option>
            <option value="Soul">Soul</option>
            </Select>
          </FormControl>
        );
      // case 2:
      //   return (
      //     <FormControl id="mbti">
      //       <FormLabel>MBTI</FormLabel>
      //       <Select value={formData.mbti} onChange={handleChange} placeholder="Select your MBTI">
      //         <option value="INTJ">INTJ</option>
      //         <option value="INTP">INTP</option>
      //         <option value="ENTJ">ENTJ</option>
      //         <option value="ENTP">ENTP</option>
      //         <option value="INFJ">INFJ</option>
      //         <option value="INFP">INFP</option>
      //         <option value="ENFJ">ENFJ</option>
      //         <option value="ENFP">ENFP</option>
      //         <option value="ISTJ">ISTJ</option>
      //         <option value="ISFJ">ISFJ</option>
      //         <option value="ESTJ">ESTJ</option>
      //         <option value="ESFJ">ESFJ</option>
      //         <option value="ISTP">ISTP</option>
      //         <option value="ISFP">ISFP</option>
      //         <option value="ESTP">ESTP</option>
      //         <option value="ESFP">ESFP</option>
      //       </Select>
      //     </FormControl>
      //   );
        case 3:
        return (
          <FormControl id="color">
            <FormLabel>Color</FormLabel>
            <Input
              type="color"
              value={formData.color}
              onChange={handleChange}
            />
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
              {step < 3 && (
                <Button onClick={handleNext} colorScheme="blue" size="md">Next</Button>
              )}
              {step === 3 && (
                <Button type="submit" colorScheme="blue" size="md">Submit</Button>
              )}
            </Stack>
          </Stack>
        </form>
        
        
      </Box>) : (
      <Box width="100%" maxWidth="500px" mx="auto" mt={10} p={5} borderWidth="1px" borderRadius="lg">
        <Output city="Seattle" image="https://wallpaperaccess.com/full/123595.jpg" text="This is Seattle."/>
        </Box>)
        }
      
      </div>
  )
}
