"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { LogIn } from "lucide-react";

import toast from "react-hot-toast";
// components
// import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/api/auth";
import { TAuthData } from "@/types/commonTypes";
import Loader from "@/components/loader";
import { useAuth } from "@/hooks/useAuth";
// types

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login: setToken } = useAuth();
  const [formData, setFormData] = useState<TAuthData>({
    password: "",
    email: "",
  });
  const onChangeHandler = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();

    const response = await login(formData);
    console.log(response, "login response");
    if (!response.error) {
      setIsLoading(false);
      toast.success(response.data?.message || "Success");
      router.push("/");
      setToken(response.data.token);
      return;
    }

    toast.error(
      response.details && response.details.length > 0
        ? response.details[0]?.message
        : response.error
    );
    setIsLoading(false);
  };
  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => onChangeHandler(e)}
              required
            />
          </div>

          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => onChangeHandler(e)}
              required
            />
          </div>
          <Button
            className="w-full disabled:cursor-not-allowed disabled:bg-gray-400"
            type="submit"
            disabled={isLoading}
          >
            {!isLoading ? (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </>
            ) : (
              <Loader />
            )}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          dont have an account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            register
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
