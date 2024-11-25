import { gql } from 'graphql-request';

export const BOARD_DETAILS_QUERY = gql`
  query BoardDetails($boardId: ID!) {
    board(id: $boardId) {
      id
      creator
      name
      description
      rewardToken
      totalPledged
      createdAt
      closed
      bounties {
        id
        description
        creator
        deadline
        cancelled
        completed
        maxCompletions
        numCompletions
        rewardAmount
        reviewers {
          id
          reviewerAddress
        }
        submissions {
          id
          submitter
          proof
          reviewed
          approved
          submittedAt
        }
        createdAt
      }
      members {
        member
      }
    }
  }
`;

export const BOARDS = gql`
{
  boards(orderBy: createdAt, orderDirection: desc) {
    id
    creator
    name
    description
    rewardToken
    totalPledged
    createdAt
    closed
  }
}`;