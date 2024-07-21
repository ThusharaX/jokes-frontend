import { useQuery } from "@tanstack/react-query";
import axios from "axios";
//
const baseURL = "http://localhost:3001";
//
const fetchJokeTypes = async () => {
  const { data } = await axios.get(`${baseURL}/joke-types`);
  return data;
};
//
export const useJokeTypeData = () => {
  return useQuery({
    queryKey: ["joke-types"],
    queryFn: fetchJokeTypes,
  });
};