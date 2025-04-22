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

interface PasswordValidation {
  minLength: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

export default function RegisterPage() {
  const [studentFirstName, setStudentFirstName] = useState("");
  const [studentLastName, setStudentLastName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [confirmStudentPassword, setConfirmStudentPassword] = useState("");
  const [studentError, setStudentError] = useState("");
  const [studentLoading, setStudentLoading] = useState(false);

  const [teacherFirstName, setTeacherFirstName] = useState("");
  const [teacherLastName, setTeacherLastName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [confirmTeacherPassword, setConfirmTeacherPassword] = useState("");
  const [teacherError, setTeacherError] = useState("");
  const [teacherLoading, setTeacherLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("student");
  
  // Password validation states
  const [studentValidations, setStudentValidations] = useState<PasswordValidation>({
    minLength: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecial: false
  });
  
  const [teacherValidations, setTeacherValidations] = useState<PasswordValidation>({
    minLength: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecial: false
  });
  
  const [isStudentPasswordValid, setIsStudentPasswordValid] = useState(false);
  const [isTeacherPasswordValid, setIsTeacherPasswordValid] = useState(false);

  // Validate student password on change
  useEffect(() => {
    validateStudentPassword(studentPassword);
  }, [studentPassword]);

  // Validate teacher password on change
  useEffect(() => {
    validateTeacherPassword(teacherPassword);
  }, [teacherPassword]);

  // Password validation functions
  const validateStudentPassword = (value: string) => {
    const newValidations = {
      minLength: value.length >= 8,
      hasUppercase: /[A-Z]/.test(value),
      hasNumber: /\d/.test(value),
      hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)
    };
    
    setStudentValidations(newValidations);
    setIsStudentPasswordValid(Object.values(newValidations).every(val => val === true));
  };

  const validateTeacherPassword = (value: string) => {
    const newValidations = {
      minLength: value.length >= 8,
      hasUppercase: /[A-Z]/.test(value),
      hasNumber: /\d/.test(value),
      hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)
    };
    
    setTeacherValidations(newValidations);
    setIsTeacherPasswordValid(Object.values(newValidations).every(val => val === true));
  };

  const registerStudent = async () => {
    // Clear previous errors
    setStudentError("");
    
    // Validate password meets requirements
    if (!isStudentPasswordValid) {
      setStudentError("Password does not meet all requirements");
      return;
    }
    
    // Validate passwords match
    if (studentPassword !== confirmStudentPassword) {
      setStudentError("Passwords do not match");
      return;
    }
    
    // Validate required fields
    if (!studentFirstName || !studentLastName || !studentEmail) {
      setStudentError("All fields are required");
      return;
    }
    
    setStudentLoading(true);
    
    const fullname = `${studentFirstName} ${studentLastName}`;
    const payload = {
      fullname,
      last_name: studentLastName,
      email: studentEmail,
      password: studentPassword,
      confirm_password: confirmStudentPassword
    };
  
    try {
      const res = await fetch("https://api.a1schools.org/auth/register?user_type=student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        console.log("Registration successful:", data);
        // Redirect to login
        window.location.href = "/login";
      } else {
        console.error("Registration failed:", data);
        setStudentError(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setStudentError("An error occurred. Please try again.");
    } finally {
      setStudentLoading(false);
    }
  };
  
  const registerTeacher = async () => {
    // Clear previous errors
    setTeacherError("");
    
    // Validate password meets requirements
    if (!isTeacherPasswordValid) {
      setTeacherError("Password does not meet all requirements");
      return;
    }
    
    // Validate passwords match
    if (teacherPassword !== confirmTeacherPassword) {
      setTeacherError("Passwords do not match");
      return;
    }
    
    // Validate required fields
    if (!teacherFirstName || !teacherLastName || !teacherEmail) {
      setTeacherError("All fields are required");
      return;
    }
    
    setTeacherLoading(true);
    
    const fullname = `${teacherFirstName} ${teacherLastName}`;
    const payload = {
      fullname,
      last_name: teacherLastName,
      email: teacherEmail,
      password: teacherPassword,
      confirm_password: confirmTeacherPassword
    };

    try {
      const res = await fetch("https://api.a1schools.org/auth/register?user_type=instructor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        console.log("Registration successful:", data);
        window.location.href = "/login";
      } else {
        console.error("Registration failed:", data);
        setTeacherError(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setTeacherError("An error occurred. Please try again.");
    } finally {
      setTeacherLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Component for rendering password requirements
  const PasswordRequirements = ({ validations }: { validations: PasswordValidation }) => (
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
    <div className="container flex  w-screen py-[50px]  flex-col items-center justify-center">
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
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign up to get started with your learning journey
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
                <CardTitle>Student Registration</CardTitle>
                <CardDescription>
                  Create your student account to access courses and learning
                  materials.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-first-name">First Name</Label>
                    <Input 
                      id="student-first-name" 
                      onChange={(e) => setStudentFirstName(e.target.value)}
                      placeholder="John" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-last-name">Last Name</Label>
                    <Input 
                      id="student-last-name" 
                      onChange={(e) => setStudentLastName(e.target.value)}
                      placeholder="Doe" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-email">Email</Label>
                  <Input
                    id="student-email"
                    type="email"
                    placeholder="name@example.com"
                    onChange={(e) => setStudentEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="student-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      onChange={(e) => setStudentPassword(e.target.value)}
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
                  {studentPassword.length > 0 && <PasswordRequirements validations={studentValidations} />}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-student-password">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirm-student-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      onChange={(e) => setConfirmStudentPassword(e.target.value)}
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
                  {confirmStudentPassword && studentPassword !== confirmStudentPassword && (
                    <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                {studentError && <p className="text-red-500 text-center w-full">{studentError}</p>}
                <Button 
                  className="w-full" 
                  onClick={registerStudent}
                  disabled={studentLoading || !isStudentPasswordValid || !studentFirstName || !studentLastName || !studentEmail || studentPassword !== confirmStudentPassword}
                >
                  {studentLoading ? "Creating Account..." : "Create Account"}
                </Button>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 border-t"></div>
                  <span className="text-xs text-muted-foreground">OR</span>
                  <div className="flex-1 border-t"></div>
                </div>
                <Button variant="outline" className="w-full">
                  Sign up with Google
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="teacher">
            <Card>
              <CardHeader>
                <CardTitle>Instructor Registration</CardTitle>
                <CardDescription>
                  Create your Instructor account to start creating courses and
                  teaching.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="teacher-first-name">First Name</Label>
                    <Input 
                      id="teacher-first-name"
                      onChange={(e) => setTeacherFirstName(e.target.value)} 
                      placeholder="John" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacher-last-name">Last Name</Label>
                    <Input 
                      id="teacher-last-name"
                      onChange={(e) => setTeacherLastName(e.target.value)}
                      placeholder="Doe" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teacher-email">Email</Label>
                  <Input
                    id="teacher-email"
                    type="email"
                    placeholder="name@example.com"
                    onChange={(e) => setTeacherEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teacher-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="teacher-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      onChange={(e) => setTeacherPassword(e.target.value)}
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
                  {teacherPassword.length > 0 && <PasswordRequirements validations={teacherValidations} />}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-teacher-password">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirm-teacher-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      onChange={(e) => setConfirmTeacherPassword(e.target.value)}
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
                  {confirmTeacherPassword && teacherPassword !== confirmTeacherPassword && (
                    <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                {teacherError && <p className="text-red-500 text-center w-full">{teacherError}</p>}
                <Button 
                  onClick={registerTeacher} 
                  className="w-full"
                  disabled={teacherLoading || !isTeacherPasswordValid || !teacherFirstName || !teacherLastName || !teacherEmail || teacherPassword !== confirmTeacherPassword}
                >
                  {teacherLoading ? "Creating Account..." : "Create Account"}
                </Button>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 border-t"></div>
                  <span className="text-xs text-muted-foreground">OR</span>
                  <div className="flex-1 border-t"></div>
                </div>
                <Button variant="outline" className="w-full">
                  Sign up with Google
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
    </>
  );
}