import React from "react";
import {
  Box,
  Center,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";

export async function getStaticProps(context) {
  const resData = await fetch("https://patagonya-fplb-ackend.vercel.app");
  const data = await resData.json();
  const matches = data.matches;
  const gameweek =
    data.standings[0].matches_drawn +
    data.standings[0].matches_lost +
    data.standings[0].matches_won;

  const managers = data.league_entries;

  const getTeam = (id) => {
    let team = "";
    managers.forEach((manager) => {
      if (manager.id === id) {
        team = manager.entry_name;
        return;
      }
    });
    return team;
  };

  const getRank = (id) => {
    let rank = "";
    data.standings.forEach((team) => {
      if (team.league_entry === id) {
        rank = team.rank;
        return;
      }
    });
    return rank;
  };

  const filterPreviousMatches = (matches, gameweek) => {
    const result = [];

    const filteredMatches = matches.filter((match) => {
      return match.event === gameweek;
    });

    for (const match of filteredMatches) {
      const team1 = getTeam(match.league_entry_1);
      const team1Rank = getRank(match.league_entry_1);
      const team2 = getTeam(match.league_entry_2);
      const team2Rank = getRank(match.league_entry_2);
      const score1 = match.league_entry_1_points;
      const score2 = match.league_entry_2_points;
      result.push({ team1, team1Rank, score1, team2, team2Rank, score2 });
    }
    return result;
  };

  const prevResults = filterPreviousMatches(matches, gameweek);
  return {
    props: { prevResults, gameweek },
  };
}

export default function Results({ prevResults, gameweek }) {
  return (
    <Box borderBottom="solid" borderTop="solid" borderRadius="lg">
      <TableContainer whiteSpace={"break-spaces"}>
        <Heading size="l">
          <Center>Gameweek {gameweek}</Center>
        </Heading>
        <Table variant="striped" size={{ base: "sm", md: "md" }}>
          <Tbody>
            {prevResults.map((line) => (
              <Tr>
                <Td>
                  <Text align={"center"}>
                    {line.score1 > line.score2 ? (
                      <strong>{line.team1}</strong>
                    ) : (
                      `${line.team1}`
                    )}
                    <strong>({line.team1Rank})</strong>
                  </Text>
                </Td>
                <Td>
                  <Text align={"right"}>{line.score1}</Text>
                </Td>
                <Td>
                  <Text align={"center"}>-</Text>
                </Td>
                <Td>
                  <Text align={"left"}>{line.score2}</Text>
                </Td>
                <Td>
                  <Text align={"center"}>
                    {line.score2 > line.score1 ? (
                      <strong>{line.team2}</strong>
                    ) : (
                      `${line.team2}`
                    )}
                    <strong>({line.team2Rank})</strong>
                  </Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
