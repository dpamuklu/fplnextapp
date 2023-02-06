import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  Heading,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";

const Links = [
  { index: 0, name: "Standings", menu: "standings" },
  { index: 1, name: "Fixtures", menu: "fixtures" },
  { index: 2, name: "Results", menu: "results" },
];

const NavLink = ({ children }) => (
  <Link
    as={NextLink}
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={`/${children.menu}`}
  >
    {children.name}
  </Link>
);

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();
  const router = useRouter();

  const logout = () => {
    signOut();
    router.push("/");
  };

  const login = () => {
    router.push("/login");
  };

  return (
    <>
      <Head>
        <title>Patagonya FPL</title>
        <link rel="icon" href="../images/pl_logo.ico" />
      </Head>
      <Box bg={useColorModeValue("gray.200", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Link as={NextLink} href="/standings">
                <Box>
                  <Image
                    width={"s"}
                    height={"5"}
                    rounded={"lg"}
                    src="../images/pl_logo.png"
                  ></Image>
                </Box>
              </Link>
            </Box>
            <Heading as="h3" size="md" alignItems={"center"}>
              Patagonya FPL
            </Heading>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link.index}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                {session && session.user.image ? (
                  <Avatar size={"sm"} src={session.user.image} />
                ) : (
                  <Avatar size={"sm"} />
                )}
              </MenuButton>
              <MenuList>
                {session ? (
                  <MenuItem onClick={logout}>Logout</MenuItem>
                ) : (
                  <MenuItem onClick={login}>Login</MenuItem>
                )}
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.index}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
