"use client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";

export default function Header() {
  const { logout } = useAuth();
  return (
    <nav className="border-b bg-white backdrop-blur  fixed w-full z-10">
      <div className="container flex h-14 items-center mx-auto px-4 justify-between">
        <h1 className="text-xl font-semibold">Todo App</h1>
        <Button onClick={logout}>Logout</Button>
      </div>
    </nav>
  );
}
