import { useJokeTypeStore } from "@/store/useJokeTypeStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
//
const baseURL = "http://localhost:3003";
//
const fetchJokes = async (jokeType: string) => {
  const { data } = await axios.get(`${baseURL}/jokes/random?type=${jokeType}`);
  return data;
};
//
export const useModeratedJokeData = () => {
  const { jokeType } = useJokeTypeStore((state) => ({
    jokeType: state.jokeType,
  }));
  //
  return useQuery({
    queryKey: ["joke"],
    queryFn: () => fetchJokes(jokeType),
  });
};