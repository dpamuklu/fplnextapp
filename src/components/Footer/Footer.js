import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Image,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function SmallWithLogoLeft() {
  return (
    <Box
      bg={useColorModeValue("gray.200", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Image
          width={"s"}
          height={"5"}
          rounded={"lg"}
          src="../images/pl_logo.png"
        ></Image>

        <Text>© 2023 Patagonya FPL. All rights reserved</Text>
        <Stack direction={"row"} spacing={6}>
          <SocialButton
            label={"Twitter"}
            href={"https://twitter.com/OfficialFPL"}
          >
            <FaTwitter />
          </SocialButton>
          <SocialButton
            label={"YouTube"}
            href={"https://www.youtube.com/@premierleague/featured"}
          >
            <FaYoutube />
          </SocialButton>
          <SocialButton
            label={"Instagram"}
            href={"https://www.instagram.com/premierleague/?hl=en "}
          >
            <FaInstagram />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
