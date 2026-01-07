import express from "express";
import cors from "cors";
import { auth, isAdmin, isStudent } from "./auth/auth.middleware";

import * as authCtrl from "./controllers/auth.controller";
import * as internshipCtrl from "./controllers/internship.controller";
import * as appCtrl from "./controllers/application.controller";

const app = express();
app.use(cors());
app.use(express.json());

// Auth
app.post("/register", authCtrl.register);
app.post("/login", authCtrl.login);

// Internship
app.post("/internships", auth, isAdmin, internshipCtrl.createInternship);
app.get("/internships", auth, internshipCtrl.listInternships);

// Student
app.post("/apply", auth, isStudent, appCtrl.applyInternship);
app.get("/my-applications", auth, isStudent, appCtrl.myApplications);

// Admin
app.patch("/applications/:id", auth, isAdmin, appCtrl.updateStatus);

export default app;
