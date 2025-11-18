"use client";
import axios from "axios";

const isProd = process.env.NODE_ENV === "production";
const API_URL = isProd
  ? "https://christmas-api-1.onrender.com"
  : "http://localhost:3333";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
