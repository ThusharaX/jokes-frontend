import { useJokeTypeStore } from "@/store/useJokeTypeStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
//
const baseURL = process.env.NEXT_PUBLIC_API_URL;
//
const fetchJokes = async (jokeType: string) => {
  const { data } = await axios.get(
    `${baseURL}/deliver/jokes/random?type=${jokeType}`,
  );
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
