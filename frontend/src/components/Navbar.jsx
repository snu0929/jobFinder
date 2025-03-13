import {
    Box, Flex, Input, InputGroup, InputRightElement,
    Button, Avatar, HStack, Spacer, Text, IconButton,
    Menu, MenuButton, MenuList, MenuItem
} from "@chakra-ui/react";
// import { SearchIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const Navbar = () => {
    const isLoggedIn = true;
    const userRole = "user";
    const userName = "John Doe";
    const userInitials = userName.split(" ").map(n => n[0]).join("");

    return (
        <Box bg="gray.100" px={4} py={3} boxShadow="sm">
            <Flex align="center" maxW="1200px" mx="auto">
                {/* Logo */}
                <Link to="/">
                    <Text fontSize="xl" fontWeight="bold" color="blue.500">
                        JobFinder
                    </Text>
                </Link>

                <Spacer />

                {/* Search bar (Desktop) */}
                <InputGroup maxW="400px" mx={4} display={{ base: "none", md: "block" }}>
                    <Input placeholder="Search for jobs..." />
                    <InputRightElement>
                        <Button size="sm" bg="blue.500" color="white" _hover={{ bg: "blue.600" }}>
                            <SearchIcon />
                        </Button>
                    </InputRightElement>
                </InputGroup>

                <Spacer />

                {/* Desktop Links */}
                <HStack spacing={4} display={{ base: "none", md: "flex" }}>
                    {isLoggedIn ? (
                        <>
                            {userRole === "company" ? (
                                <Button as={Link} to="/post-job" colorScheme="blue" size="sm">
                                    Post a Job
                                </Button>
                            ) : (
                                <Button as={Link} to="/my-jobs" colorScheme="blue" size="sm">
                                    My Jobs
                                </Button>
                            )}
                            <Menu>
                                <MenuButton>
                                    <Avatar name={userName} size="sm" />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem>Profile</MenuItem>
                                    <MenuItem>Settings</MenuItem>
                                    <MenuItem color="red.500">Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Button as={Link} to="/login" size="sm" colorScheme="blue">
                                Login
                            </Button>
                            <Button as={Link} to="/signup" size="sm" colorScheme="gray">
                                Signup
                            </Button>
                        </>
                    )}
                </HStack>

                {/* Mobile Menu (Hamburger) */}
                <Box display={{ base: "block", md: "none" }}>
                    <Menu>
                        <MenuButton as={IconButton} icon={<HamburgerIcon />} variant="outline" />
                        <MenuList>
                            <MenuItem as={Link} to="/">Home</MenuItem>
                            <MenuItem as={Link} to="/jobs">Browse Jobs</MenuItem>
                            {isLoggedIn ? (
                                <>
                                    {userRole === "company" ? (
                                        <MenuItem as={Link} to="/post-job">Post a Job</MenuItem>
                                    ) : (
                                        <MenuItem as={Link} to="/my-jobs">My Jobs</MenuItem>
                                    )}
                                    <MenuItem>Profile</MenuItem>
                                    <MenuItem>Settings</MenuItem>
                                    <MenuItem color="red.500">Logout</MenuItem>
                                </>
                            ) : (
                                <>
                                    <MenuItem as={Link} to="/login">Login</MenuItem>
                                    <MenuItem as={Link} to="/signup">Signup</MenuItem>
                                </>
                            )}
                        </MenuList>
                    </Menu>
                </Box>
            </Flex>
        </Box>
    );
};

export default Navbar;
