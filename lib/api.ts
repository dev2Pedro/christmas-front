"use client";
import axios from "axios";

// 🔥 FORÇAR URL DE PRODUÇÃO
const isProd = process.env.NODE_ENV === "production";
const API_URL = isProd
  ? "https://christmas-api-1.onrender.com" // ✅ Produção
  : "http://localhost:3333"; // ✅ Desenvolvimento

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Debug - remover depois
console.log("🔧 Ambiente:", process.env.NODE_ENV);
console.log("🔧 API URL:", API_URL);
