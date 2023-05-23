import { api } from "./api";

export const addTeam = (data) => {
  return api.post("/teams", data);
};

export const getAllTasks = () => {
  return api.get("/teams");
};

export const getTeamsByUserId = (userid) => {
  return api.get(`/teams/by-user?userid=${userid}`);
};