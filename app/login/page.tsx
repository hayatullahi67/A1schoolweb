


"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Eye, EyeOff, Check, X } from "lucide-react";

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
import Header from "@/components/header";

interface Role {
  name: string;
}

interface PasswordValidation {
  minLength: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [validations, setValidations] = useState<PasswordValidation>({
    minLength: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecial: false
  });
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Validate password on every change
  useEffect(() => {
    validatePassword(password);
  }, [password]);

  // Password validation function
  const validatePassword = (value: string) => {
    const newValidations = {
      minLength: value.length >= 8,
      hasUppercase: /[A-Z]/.test(value),
      hasNumber: /\d/.test(value),
      hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)
    };
    
    setValidations(newValidations);
    
    // Check if all validations pass
    const allValid = Object.values(newValidations).every(val => val === true);
    setIsPasswordValid(allValid);
  };

  const handleLogin = async () => {
    if (!isPasswordValid) {
      setError("Please ensure your password meets all requirements");
      return;
    }
    
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
        localStorage.setItem("userData", JSON.stringify(data.data));
  
        const roles = data.data.roles || [];
        const isStudent = roles.some((role: Role) => role.name === "student");
        if (isStudent) {
          window.location.href = "/student/dashboard";
        } else {
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
  
  const handleLogin2 = async () => {
    if (!isPasswordValid) {
      setError("Please ensure your password meets all requirements");
      return;
    }
    
    setLoading(true);
    setError("");
  
    const loginData = { email, password };
    console.log('Login Data:', loginData);
  
    try {
      const res = await fetch("https://api.a1schools.org/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
  
      const data = await res.json();
      console.log("Response Data:", data);
  
      if (res.ok) {
        localStorage.setItem("userData", JSON.stringify(data.data));
        const roles = data.data.roles || [];
        console.log('Roles:', roles);
  
        const isStudent = roles.some((role: Role) => role.name === "instructor");
        if (isStudent) {
          window.location.href = "/teacher/dashboard";
        } else {
          setError("Unknown role. Access is denied.");
        }
      } else {
        const errorMessage = data?.message || 'Login failed. Please try again.';
        setError(errorMessage);
      }
    } catch (err) {
      console.error('Error:', err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const handleGoogleLogin = () => {
  //   const userTypeParam = userType;
  //   const googleLoginUrl = `https://api.a1schools.org/auth/google?user_type=${
  //     userTypeParam === "teacher" ? "instructor" : userTypeParam
  //   }`;

  //   window.location.href = googleLoginUrl;
  // };
  
  // Component for rendering password requirements
  
  const PasswordRequirements = () => (
    <div className="mt-2 space-y-1 text-sm">
      <div className={`flex items-center gap-1 ${validations.minLength ? 'text-green-500' : 'text-red-500'}`}>
        {validations.minLength ? <Check size={14} /> : <X size={14} />}
        <span>Minimum 8 characters</span>
      </div>
      <div className={`flex items-center gap-1 ${validations.hasUppercase ? 'text-green-500' : 'text-red-500'}`}>
        {validations.hasUppercase ? <Check size={14} /> : <X size={14} />}
        <span>Uppercase letter</span>
      </div>
      <div className={`flex items-center gap-1 ${validations.hasNumber ? 'text-green-500' : 'text-red-500'}`}>
        {validations.hasNumber ? <Check size={14} /> : <X size={14} />}
        <span>Number</span>
      </div>
      <div className={`flex items-center gap-1 ${validations.hasSpecial ? 'text-green-500' : 'text-red-500'}`}>
        {validations.hasSpecial ? <Check size={14} /> : <X size={14} />}
        <span>Special character</span>
      </div>
    </div>
  );

  return (
    <>
    <Header />
    <div className="container flex py-[50px]  w-screen flex-col items-center justify-center">
      {/* <Link
        href="/"
        className="absolute left-4 top-4 flex items-center gap-2 md:left-8 md:top-8"
      >
        <BookOpen className="h-6 w-6 text-primary" />
        <span className="font-bold">A1 School</span>
      </Link> */}
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
            <TabsTrigger value="teacher">Instructor</TabsTrigger>
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
                  {password.length > 0 && <PasswordRequirements />}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                {error && <p className="text-red-500 text-center">{error}</p>}
                <Button 
                  onClick={handleLogin} 
                  disabled={loading || !isPasswordValid || !email} 
                  className="w-full"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
                
                <div className="flex items-center space-x-2">
                  <div className="flex-1 border-t"></div>
                  <span className="text-xs text-muted-foreground">OR</span>
                  <div className="flex-1 border-t"></div>
                </div>
                <Button
                   variant="outline"
                   className="w-full"
                  //  onClick={handleGoogleLogin}
                 >
                   Sign in with Google
                 </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="teacher">
            <Card>
              <CardHeader>
                <CardTitle>Instructor Login</CardTitle>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  {password.length > 0 && <PasswordRequirements />}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                {error && <p className="text-red-500 text-center">{error}</p>}
                <Button 
                  onClick={handleLogin2} 
                  disabled={loading || !isPasswordValid || !email} 
                  className="w-full"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
                
                <div className="flex items-center space-x-2">
                  <div className="flex-1 border-t"></div>
                  <span className="text-xs text-muted-foreground">OR</span>
                  <div className="flex-1 border-t"></div>
                </div>
                <Button
                   variant="outline"
                   className="w-full"
                  //  onClick={handleGoogleLogin}
                 >
                   Sign in with Google
                 </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Don not have an account?
          <Link
            href="/register"
            className="text-primary underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
    </>
  );
}