// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ LOGIN: kiểm tra email hoặc username + password
  const login = async (identifier, password) => {
    try {
      const res = await fetch("http://localhost:5000/accounts");
      if (!res.ok) throw new Error("Failed to fetch accounts");
      const users = await res.json();

      const found = users.find(
        (u) =>
          (u.email === identifier || u.username === identifier) &&
          u.password === password
      );

      if (found) {
        setUser(found);
        localStorage.setItem("user", JSON.stringify(found));
        return true;
      } else {
        alert("❌ Sai tài khoản hoặc mật khẩu!");
        return false;
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("❌ Lỗi server khi login!");
      return false;
    }
  };

  // ✅ REGISTER: lưu user mới vào db.json
  const register = async (newUser) => {
    try {
      const res = await fetch("http://localhost:5000/accounts");
      if (!res.ok) throw new Error("Failed to fetch accounts");
      const users = await res.json();

      const exists = users.some(
        (u) => u.email === newUser.email || u.username === newUser.username
      );
      if (exists) {
        alert("❌ Email hoặc username đã tồn tại!");
        return false;
      }

      // Ghi user mới vào db.json
      await fetch("http://localhost:5000/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      return true;
    } catch (err) {
      console.error("Register error:", err);
      alert("❌ Lỗi server khi đăng ký!");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
