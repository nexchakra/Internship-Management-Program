import axios from "./axios";

export const applyInternship = (internshipId: string) =>
  axios.post("/apply", { internshipId });

export const myApplications = () =>
  axios.get("/my-applications");
