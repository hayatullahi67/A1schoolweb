"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Role {
  name: string;
}
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };



  // const handleLogin = async () => {
  //   setLoading(true);
  //   setError(""); // Reset error before new login attempt
  //   const loginData = { email, password, userType };

  //   try {
  //     const res = await fetch("https://api.a1schools.org/auth/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(loginData),
  //     });

  //     const data = await res.json();
  //       console.log("data",data)
  //     if (res.ok) {
  //       // Store token or any other data (e.g., JWT) for authenticated sessions
  //       localStorage.setItem("authToken", data.token); // Example of storing token
  //       // Redirect user to a dashboard or home page
  //       // window.location.href = "/dashboard"; // You can change this based on your app
  //     } else {
  //       setError(data.message || "Login failed. Please try again.");
  //     }
  //   } catch (err) {
  //     setError("An error occurred. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleLogin = async () => {
    setLoading(true);
    setError(""); // Reset error before new login attempt
  
    const loginData = { email, password, userType };
  
    try {
      const res = await fetch("https://api.a1schools.org/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
  
      const data = await res.json();
      console.log("data", data);
  
      if (res.ok) {
        // Store token and user data in localStorage for authenticated sessions
        // localStorage.setItem("authToken", data.token);
        localStorage.setItem("userData", JSON.stringify(data.data)); // Store the user data
  
        // Check user role and navigate accordingly
        const roles = data.data.roles || [];
        const isStudent = roles.some((role: Role) => role.name === "student");
        // const isInstructor = roles.some((role: Role) => role.name === "instructor");
        if (isStudent) {
          // Navigate to student dashboard
          window.location.href = "/student/dashboard"; // Adjust URL as needed

        } else {
          // Handle other roles or show an error message
          setError("Unknown role. Access is denied.");
        }
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const teacherhandleLogin = async () => {
    setLoading(true);
    setError(""); // Reset error before new login attempt
  
    const loginData = { email, password, userType };
  
    try {
      const res = await fetch("https://api.a1schools.org/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
  
      const data = await res.json();
      console.log("data", data);
  
      if (res.ok) {
        // Store token and user data in localStorage for authenticated sessions
        // localStorage.setItem("authToken", data.token);
        localStorage.setItem("userData", JSON.stringify(data.data)); // Store the user data
  
        // Check user role and navigate accordingly
        const roles = data.data.roles || [];
        const isInstructor = roles.some((role: Role) => role.name === "instructor");
        // const isInstructor = roles.some((role: Role) => role.name === "instructor");
        if (isInstructor) {
          // Navigate to student dashboard
          window.location.href = "/teacher/dashboard"; // Adjust URL as needed

        } else {
          // Handle other roles or show an error message
          setError("Unknown role. Access is denied.");
        }
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className="absolute left-4 top-4 flex items-center gap-2 md:left-8 md:top-8"
      >
        <BookOpen className="h-6 w-6 text-primary" />
        <span className="font-bold">EduLearn</span>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to sign in to your account
          </p>
        </div>
        <Tabs
          defaultValue="student"
          className="w-full"
          onValueChange={setUserType}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="teacher">Teacher</TabsTrigger>
          </TabsList>
          <TabsContent value="student">
            <Card>
              <CardHeader>
                <CardTitle>Student Login</CardTitle>
                <CardDescription>
                  Access your courses, assignments, and progress.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student-email">Email</Label>
                  <Input
                    id="student-email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="student-password">Password</Label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-primary underline-offset-4 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="student-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
              {error && <p className="text-red-500 text-center">{error}</p>}
                <Button onClick={handleLogin} disabled={loading} className="w-full">  {loading ? "Signing In..." : "Sign In"}</Button>
                
                <div className="flex items-center space-x-2">
                  <div className="flex-1 border-t"></div>
                  <span className="text-xs text-muted-foreground">OR</span>
                  <div className="flex-1 border-t"></div>
                </div>
                <Button variant="outline" className="w-full">
                  Sign in with Google
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="teacher">
            <Card>
              <CardHeader>
                <CardTitle>Teacher Login</CardTitle>
                <CardDescription>
                  Access your dashboard, courses, and student data.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="teacher-email">Email</Label>
                  <Input
                    id="teacher-email"
                    type="email"
                    placeholder="name@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="teacher-password">Password</Label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-primary underline-offset-4 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="teacher-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
              {error && <p className="text-red-500 text-center">{error}</p>}
              <Button onClick={teacherhandleLogin} disabled={loading} className="w-full">  {loading ? "Signing In..." : "Sign In"}</Button>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 border-t"></div>
                  <span className="text-xs text-muted-foreground">OR</span>
                  <div className="flex-1 border-t"></div>
                </div>
                <Button variant="outline" className="w-full">
                  Sign in with Google
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-primary underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
