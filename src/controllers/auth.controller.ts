import { Request, Response } from "express";
import { memoryStore } from "../storage/memory.store";
import { v4 as uuid } from "uuid";
import { hashPassword, comparePassword, generateToken } from "../auth/auth.service";

export const register = (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  if (memoryStore.users.find(u => u.email === email)) {
    return res.status(400).json({ message: "User exists" });
  }

  memoryStore.users.push({
    id: uuid(),
    name,
    email,
    password: hashPassword(password),
    role
  });

  res.json({ message: "Registered" });
};

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = memoryStore.users.find(u => u.email === email);

  if (!user || !comparePassword(password, user.password))
    return res.status(401).json({ message: "Invalid credentials" });

  res.json({
    token: generateToken(user),
    role: user.role
  });
};
