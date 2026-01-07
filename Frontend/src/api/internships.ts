import axios from "./axios";

export const getInternships = () =>
  axios.get("/internships");

export const createInternship = (data: {
  title: string;
  company: string;
}) =>
  axios.post("/internships", data);
