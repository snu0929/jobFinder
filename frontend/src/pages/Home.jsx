import { Box, Heading, Text, Button } from '@chakra-ui/react';
import React from 'react';

const Home = () => {
    return (
        <Box
            bg="gray.100"
            p={8}
            borderRadius="lg"
            boxShadow="lg"
            maxW="600px"
            mx="auto"
            mt={20}
            textAlign="center"
        >
            <Heading color="teal.500" size="xl" mb={4}>
                Welcome to Job Finder App
            </Heading>
            <Text color="gray.600" fontSize="lg" mb={6}>
                Find your dream job and post job listings with ease.
            </Text>
            <Button colorScheme="teal" size="lg" _hover={{ bg: "teal.600" }}>
                Get Started
            </Button>
        </Box>
    );
};

export default Home;
