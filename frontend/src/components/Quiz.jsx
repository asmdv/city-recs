import React from 'react'
import {  Box, Button, FormControl, FormLabel, Input, Stack, Text, Select, Progress } from '@chakra-ui/react';
import { useState } from 'react';
import Output from './Output';
import axios from 'axios';

export default function Quiz() {


  const [step, setStep] = useState(0);
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isOther, setIsOther] = useState(false);
  const [formData, setFormData] = useState({
    occupation: '',
    music: '',
    EvsI: '',
    E: '',
    SvsN: '',
    TvsF: '',
    JvsP: '',
    Q: ''
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
    handleSubmitButton();
    // You can add form submission logic here
  };

  function retakeQuiz(e) {
    setSubmitted(false);
    setStep(0);
  }

  

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <FormControl id="occupation" isRequired>
            <FormLabel>Select your occupation</FormLabel>
            <Select value={formData.occupation} onChange={handleChange} name="occupation" placeholder="Accountant">
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
          <FormControl id="music" isRequired >
            <FormLabel>Select your music taste</FormLabel>
              <Select value={formData.music} onChange={handleChange} name="music" placeholder="Blues">
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
      case 2:
        return (
          <FormControl id="EvsI" isRequired>
            <FormLabel>When you are in a social setting, do you:</FormLabel>
            <Select value={formData.EvsI} onChange={handleChange} placeholder="Enjoy being the center of attention">
              <option value="Center">Enjoy being the center of attention</option>
              <option value="Observe">Prefer to observe and listen</option>
            </Select>
          </FormControl>
        );
      case 3:
        return (
          <FormControl id="EvsI" isRequired>
            <FormLabel>Do you find it more rewarding to:</FormLabel>
            <Select value={formData.EvsI} onChange={handleChange} placeholder="Interact with a variety of people">
              <option value="Interact">Interact with a variety of people</option>
              <option value="Meaningful">Have deep, meaningful conversations with a few people.</option>
            </Select>
          </FormControl>
        );
      case 4:
        return (
          <FormControl id="SvsN" isRequired>
            <FormLabel>When making decisions, do you prefer to:</FormLabel>
            <Select value={formData.SvsN} onChange={handleChange} placeholder="Rely on your direct experience and facts">
              <option value="Experience">Rely on your direct experience and facts</option>
              <option value="Instincts">Trust your gut instincts and look at the big picture</option>
            </Select>
          </FormControl>
        );
      case 5:
        return (
          <FormControl id="TvsF" isRequired>
            <FormLabel>In your work, do you prefer:</FormLabel>
            <Select value={formData.TvsF} onChange={handleChange} placeholder="Clarity and logical reasoning">
              <option value="Logical">Clarity and logical reasoning</option>
              <option value="Harmony">Harmony and personal involvement</option>
            </Select>
          </FormControl>
        );
      case 6:
        return (
          <FormControl id="JvsP" isRequired>
            <FormLabel>Do you prefer your life to be:</FormLabel>
            <Select value={formData.JvsP} onChange={handleChange} placeholder="Structured and organized">
              <option value="Organized">Structured and organized</option>
              <option value="Flexible">Flexible and spontaneous</option>
            </Select>
          </FormControl>
        );
      case 7:
        return (
          <FormControl id="Q" isRequired>
            <FormLabel>In your free time, do you:</FormLabel>
            <Select value={formData.Q} onChange={handleChange} placeholder="Seek out social activities">
              <option value="Social">Seek out social activities</option>
              <option value="Isolated">Prefer to spend time alone or with a few close friends</option>
            </Select>
          </FormControl>
        );
      default:
        return (
          <Text>Thank you! Your form has been submitted.</Text>
        );
    }
  };

  axios.defaults.baseURL = 'https://t-amammadov-internhacks-backend.azurewebsites.net';
  const handleSubmitButton = async () => {
    var occupation = formData.occupation;
    var music = formData.music;
    var isTest = formData.isTest || false;

    try {
      const response = await axios.post('/ask', { occupation, music, isTest });

      const modifiedCity = response.data.cities[0];
      const city = modifiedCity.split(',')[0];
      setCity(city);

      const description = response.data.explanation;
      setDescription(description);

    } catch (error) {
      console.error('There was an error!', error.response);
    }

  }

  return (
    <div>
      {!submitted ? (
   <Box width="100%" maxWidth="500px" mx="auto" mt={10} p={5} borderWidth="1px" borderRadius="lg">
   <Progress value={(step / 8) * 100} mb={4} mt={3}/>
          <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            {renderStep()}

            <Stack direction="row" spacing={4}>
              {step > 0 && (
                <Button onClick={handlePrev} colorScheme="blue" size="md">Previous</Button>
              )}
              {step < 7 && (
                <Button onClick={handleNext} colorScheme="blue" size="md">Next</Button>
              )}
              {step === 7 && (
                <Button type="submit" colorScheme="blue" size="md">Submit</Button>
              )}
            </Stack>
          </Stack>
        </form>
        
        
      </Box>) : (
        <div>
        <Box width="100%" maxWidth="500px" mx="auto" mt={10} p={5} borderWidth="1px" borderRadius="lg">
        
          {submitted && <Output city={city} image="https://wallpaperaccess.com/full/123595.jpg" text={description} />}
          <Box mt={5} display="flex" justifyContent="center">
            <Button onClick={() => retakeQuiz()}>Retake Quiz</Button>
          </Box>
        </Box>
      </div>
        )
        }
      
      </div>
  )
}
