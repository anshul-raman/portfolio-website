import { Box, Container, Text } from "@chakra-ui/react";
import type { NextPage, NextComponentType } from "next";
import Head from "next/head";
import Image from "next/image";
import { Children } from "react";
import styles from "../styles/Home.module.css";

interface Props {
  children?: React.ReactNode;
}

const Home: NextPage<Props> = ({children}) => {
  return (
    <Box as="main">
      <Head>
        <title>Anshul Raman - HomePage</title>
        <meta name="description" content="Anshul's Homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW={"container.md"} h="full" centerContent>
        {/* Name and photo  */}
        <Text>Hello</Text>
        {children}
      </Container>
    </Box>
  );
};

export default Home;
