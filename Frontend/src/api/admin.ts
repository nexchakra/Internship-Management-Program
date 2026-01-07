import axios from "./axios";

export const updateStatus = (id: string, status: string) =>
  axios.patch(`/applications/${id}`, { status });
