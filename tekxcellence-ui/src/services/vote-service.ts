import { SUBMITVOTE } from "../end-point";
import callAndReturn from "./utils";

export const submitVote = (
  rewardPoints: number,
  feedback: string,
  votedById: number,
  votedToId: number
) => {
  const token = localStorage.getItem("token");
  const data = JSON.stringify({
    votedById: votedById,
    voteToId: votedToId,
    feedback:feedback,
    points: rewardPoints,
  });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: data,
  };
  return callAndReturn(SUBMITVOTE, options);
};
