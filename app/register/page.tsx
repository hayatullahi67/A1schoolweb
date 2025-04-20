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

export default function RegisterPage() {
  const [studentFirstName, setStudentFirstName] = useState("");
const [studentLastName, setStudentLastName] = useState("");
const [studentEmail, setStudentEmail] = useState("");
const [studentPassword, setStudentPassword] = useState("");
const [confirmstudentPassword, setConfirmStudentPassword] = useState("");


const [teachertFirstName, setTeacherFirstName] = useState("");
const [teacherLastName, setTeacherLastName] = useState("");
const [teacherEmail, setTeacherEmail] = useState("");
const [teacherPassword, setTeacherPassword] = useState("");
const [confirmteacherPassword, setConfirmTeacherPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("student");


  const registerStudent = async () => {
    const fullname = `${studentFirstName} ${studentLastName}`;
    const payload = {
      fullname,
      last_name: studentLastName,
      email: studentEmail,
      password: studentPassword,
      confirm_password: confirmstudentPassword
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
        // Redirect to login or show success message
        window.location.href = "/login"; // Adjust URL as needed

      } else {
        console.error("Registration failed:", data);
        // Show error message to user
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  

  const registerTeacher = async () => {
    const fullname = `${teachertFirstName} ${teacherLastName}`;
    const payload = {
      fullname,
      last_name: teacherLastName,
      email: teacherEmail,
      password: teacherPassword,
      confirm_password: confirmteacherPassword
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
        // Redirect to login or show success message
        window.location.href = "/login"; // Adjust URL as needed

      } else {
        console.error("Registration failed:", data);
        // Show error message to user
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className="absolute left-4 top-4 flex items-center gap-2 md:left-8 md:top-8"
      >
        <BookOpen className="h-6 w-6 text-primary" />
        <span className="font-bold">A1 School</span>
      </Link>
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
                    <Input id="student-first-name" 
                         onChange={(e) => setStudentFirstName(e.target.value)}
                    placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-last-name">Last Name</Label>
                    <Input id="student-last-name" 
                      onChange={(e) => setStudentLastName(e.target.value)}
                    placeholder="Doe" />
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
</div>

              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button className="w-full" 
                onClick={registerStudent}
                >Create Account</Button>
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
                <CardTitle>Teacher Registration</CardTitle>
                <CardDescription>
                  Create your Instructor account to start creating courses and
                  teaching.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="teacher-first-name">First Name</Label>
                    <Input id="teacher-first-name"
                    onChange={(e) => setTeacherFirstName(e.target.value)} 
                    placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacher-last-name"
                    >Last Name</Label>
                    <Input id="teacher-last-name"
                    onChange={(e) => setTeacherLastName(e.target.value)}
                    
                    placeholder="Doe" />
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teacher-password">confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="teacher-password"
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
                </div>
                {/* <div className="space-y-2">
                  <Label htmlFor="teacher-qualification">Qualification</Label>
                  <Input
                    id="teacher-qualification"
                    placeholder="e.g., MSc in Computer Science"
                  />
                </div> */}
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button onClick={registerTeacher} className="w-full">Create Account</Button>
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
  );
}
