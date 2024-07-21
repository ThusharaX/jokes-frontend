import { useQuery } from "@tanstack/react-query";
import axios from "axios";
//
const baseURL = process.env.NEXT_PUBLIC_API_URL;
//
const fetchJokeTypes = async () => {
  const { data } = await axios.get(`${baseURL}/submit/joke-types`);
  return data;
};
//
export const useJokeTypeData = () => {
  return useQuery({
    queryKey: ["joke-types"],
    queryFn: fetchJokeTypes,
  });
};