import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Center,
  Heading,
  Box,
} from "@chakra-ui/react";

export async function getStaticProps(context) {
  const resData = await fetch("https://patagonya-fplb-ackend.vercel.app");
  const data = await resData.json();
  const priceUrl = "https://blockchain.info/ticker";
  const resPrice = await fetch(priceUrl);
  const price = await resPrice.json();
  const trlPrice = 0.00577931 * price.TRY.last;
  const standings = data.standings;
  const name = data.league.name;
  const league_entries = data.league_entries;
  return {
    props: { standings, name, league_entries, trlPrice },
    revalidate: 10,
  };
}

export default function Standings({
  standings,
  name,
  league_entries,
  trlPrice,
}) {
  const getName = (id) => {
    return league_entries.map((entry) => {
      if (entry.id === id) {
        return entry.entry_name;
      }
    });
  };
  const setAmountbyRank = (rank) => {
    switch (rank) {
      case 1:
        return (trlPrice * 0.5).toFixed(1);
      case 2:
        return (trlPrice * 0.25).toFixed(1);
      case 3:
        return (trlPrice * 0.15).toFixed(1);
      case 4:
        return (trlPrice * 0.1).toFixed(1);
      default:
    }
  };

  const setColor = (rank) => {
    if (rank <= 4) return "green.100";
    if (rank > 10) return "red.100";
  };

  const columns = ["Rank", "Team", "W", "D", "L", "Score", "Pts", "Reward(TL)"];

  return (
    <Box padding={"3"}>
      <TableContainer whiteSpace={"break-spaces"}>
        <Heading size="l">
          <Center>{name}</Center>
        </Heading>
        <Table variant="sample" size={{ base: "sm", md: "md" }}>
          <Thead>
            <Tr>
              {columns.map((column, index) => (
                <Th key={index}>{column}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {standings.map((team, index) => (
              <Tr
                borderBottom="1px"
                borderColor="gray.300"
                bg={setColor(team.rank)}
                key={index}
              >
                <Td>{team.rank}</Td>
                <Td>{getName(team.league_entry)}</Td>
                <Td>{team.matches_won}</Td>
                <Td>{team.matches_drawn}</Td>
                <Td>{team.matches_lost}</Td>
                <Td>{team.points_for}</Td>
                <Td>{team.total}</Td>
                <Td>{setAmountbyRank(team.rank)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
