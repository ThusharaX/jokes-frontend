import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
//
const baseURL = process.env.NEXT_PUBLIC_MODERATE_SERVICE;
//
const fetchSubmittedJokes = async () => {
  const { data } = await axiosInstance.get(`${baseURL}/jokes/submitted`);
  return data;
};
//
export const useSubmittedJokeData = () => {
  return useQuery({
    queryKey: ["submitted-jokes"],
    queryFn: fetchSubmittedJokes,
  });
};
