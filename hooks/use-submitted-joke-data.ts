import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
//
const baseURL = process.env.NEXT_PUBLIC_API_URL;
//
const fetchSubmittedJokes = async () => {
  const { data } = await axiosInstance.get(
    `${baseURL}/moderate/jokes/submitted`,
  );
  return data;
};
//
export const useSubmittedJokeData = () => {
  return useQuery({
    queryKey: ["submitted-jokes"],
    queryFn: fetchSubmittedJokes,
  });
};
