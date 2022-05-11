import { GraphQLClient, gql } from "graphql-request";
// import { PrismaClient } from "@prisma/client";

const client = new GraphQLClient("https://api.stratz.com/graphql", {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJodHRwczovL3N0ZWFtY29tbXVuaXR5LmNvbS9vcGVuaWQvaWQvNzY1NjExOTgxNDA1NTI1ODIiLCJ1bmlxdWVfbmFtZSI6ItCf0ZHRgSDQtNCwINC70LjRgSIsIlN1YmplY3QiOiI1Yjk0M2MwYi1hMzNhLTRkYWUtODBmZi1jODE1MWNkZjIxYWMiLCJTdGVhbUlkIjoiMTgwMjg2ODU0IiwibmJmIjoxNjUxOTUxOTM1LCJleHAiOjE2ODM0ODc5MzUsImlhdCI6MTY1MTk1MTkzNSwiaXNzIjoiaHR0cHM6Ly9hcGkuc3RyYXR6LmNvbSJ9.7MBB8n4PNrQDZz13fMy0z8Or8bzoixM82cSwS3Q0ztY",
  },
});
export const getMatchesFromPlayer = async (playerId: number) => {
  const query = gql`
    {
      player(steamAccountId: ${playerId}) {
        matches(request: { isParty: true }) {
          id
          parsedDateTime
        }
      }
    }
  `;
  const matches = await client.request(query);
  console.log(matches.player);
  return matches.player;
};
export const getMatchfromStratz = async (matchId: Number) => {
  const query = gql`
    {
      match(id: ${matchId}) {
        players {
          steamAccount {
            name
          }
          hero {
            name
          }
          kills
          deaths
          assists
          networth
          experiencePerMinute
          level
          heroDamage
          towerDamage
        }
      }
    }
  `;

  const matchStats = await client.request(query);

  matchStats.match.players.map((player) => {
    console.log(
      player.steamAccount.name +
        "\n" +
        " - Hero: " +
        player.hero.name.slice(14, player.hero.name.length) +
        "\n" +
        " - kda: " +
        player.kills +
        "/" +
        player.deaths +
        "/" +
        player.assists +
        "\n" +
        " - networth: " +
        player.networth +
        "\n" +
        " - herodamage: " +
        player.heroDamage
    );
  });
  return matchStats;
};
