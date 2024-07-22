import { useQuery } from "@tanstack/react-query";
import axios from "axios";
//
const baseURL = process.env.NEXT_PUBLIC_SUBMIT_SERVICE;
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
