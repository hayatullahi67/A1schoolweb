'use client'

import React, {useEffect, useState, ChangeEvent } from "react";
import { NextPage } from "next";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  Check, PanelLeft, X ,  BookOpen,
  Calendar,
  Clock,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
 
  Settings,
  Star,
  User, } from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sider";

import Image from "next/image";
import Link from "next/link";

type Student = {
  fullname: string;
  email: string;
  token: string;
  id: string;
};


interface PasswordValidation {
  minLength: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}
const ProfilePage: NextPage = () => {
  // Mock data - replace with real user data from API
  const [instructorName] = useState<string>("John Doe");
  const [userEmail] = useState<string>("john.doe@example.com");
  const [student, setStudent] = useState<Student>({
  fullname: "Loading...",
  email: "",
  id:"",
  token: "",
});
 const [teacherError, setTeacherError] = useState("");
  const [teacherLoading, setTeacherLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
   const [teacherValidations, setTeacherValidations] = useState<PasswordValidation>({
      minLength: false,
      hasUppercase: false,
      hasNumber: false,
      hasSpecial: false
    });
    const [isTeacherPasswordValid, setIsTeacherPasswordValid] = useState(false);
  
    useEffect(() => {
      validateNewPassword(newPassword);
    }, [newPassword]);

    

      const validateNewPassword = (value: string) => {
        const newValidations = {
          minLength: value.length >= 8,
          hasUppercase: /[A-Z]/.test(value),
          hasNumber: /\d/.test(value),
          hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)
        };
        
        setTeacherValidations(newValidations);
        setIsTeacherPasswordValid(Object.values(newValidations).every(val => val === true));
      };

      
    useEffect(() => {
        
    const stored = localStorage.getItem("userData");
    console.log("stored",stored)
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log("parsed",parsed)
      setStudent({
        fullname: parsed.fullname || "Student",
        email: parsed.email || "",
        id: parsed.id,
        token: parsed.token
      });
    }
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
      e.preventDefault();
  
     
      if (newPassword !== confirmPassword) {
        setTeacherError("Passwords do not match");
        return;}

        setTeacherLoading(true)

      if (!student.token) {
        toast.error('Authentication token not found');
        return;
      }
      const usedata = {
        password : newPassword,
        confirm_password : confirmPassword
      }
  
      try {
        const res = await fetch('https://api.a1schools.org/auth/update-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${student.token}`,
          },
          body: JSON.stringify(usedata),
        });
  
        const data = await res.json();
  
        if (!res.ok) {
          throw new Error(data.message || 'Failed to update password');
        }
  
        toast.success('Password updated successfully!');
        setConfirmPassword('');
        setNewPassword('');
      } catch (error: any) {
        setTeacherError(error.message)
        toast.error(error.message || 'An error occurred');
      }
    };

    const handleLogout = async () => {
      try {
        const response = await fetch(
          `https://api.a1schools.org/auth/logout/${student.id}`,
          {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json',
              
            },
          }
        );
    
        if (response.ok) {
          console.log('Logout successful');
          // Optional: Clear any user data from localStorage/sessionStorage
          // Redirect to login/home page
          window.location.href = '/login';
        } else {
          const errorData = await response.json();
          console.error('Logout failed:', errorData.message);
        }
      } catch (error) {
        console.error('Network error during logout:', error);
      }
    };
   

  // const handleDeleteAccount = () => {
  //   if (
  //     confirm(
  //       "Are you sure you want to delete your account? This action cannot be undone."
  //     )
  //   ) {
  //     // TODO: call API to delete account
  //     alert("Account deleted");
  //   }
  // };

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
    <SidebarProvider>
      <Sidebar>
          <SidebarHeader className="flex items-center gap-2 px-4">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-bold">A1 School</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <Link href="/student/dashboard">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={`/student/courses/${studentId}`}>
                    <BookOpen className="h-4 w-4" />
                    <span>My Courses</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/student/calendar">
                    <Calendar className="h-4 w-4" />
                    <span>Calendar</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/student/messages">
                    <MessageSquare className="h-4 w-4" />
                    <span>Messages</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/student/dashboard/profile">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/student/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}

              <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                     <button  onClick={handleLogout}>

                     <span  className="text-[red]">Log Out</span>

                     </button>
                      
                    </SidebarMenuButton>
                  </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <div className="flex items-center gap-3">
              <Image
                src="/placeholder.svg?height=40&width=40"
                width={40}
                height={40}
                alt="User avatar"
                className="rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium">{student.fullname}</span>
                <span className="text-xs text-muted-foreground">
                 {student.email}
                </span>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarTrigger className="h-10 w-10 mt-[30px] ml-[30px] lg:hidden border border-gray-300 rounded-md flex items-center justify-center">
            <PanelLeft className="h-4 w-4" />
            
          </SidebarTrigger>
    <div className="w-[70%] mt-[50px] mb-[50px] mx-auto  p-6 bg-white shadow-lg rounded-2xl">
      <ToastContainer/>
      {/* Instructor Profile */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Student Profile</h2>
        <div className="flex items-center space-x-4">
          {/* {profileImage ? (
            <img
              src={profileImage}
              alt="Profile Image"
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )} */}
          <div>
            <h3 className="text-xl font-medium">{student.fullname}</h3>
            {/* <label className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700">
              Change Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label> */}
          </div>
        </div>
      </section>

      {/* Settings - Read-Only */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Settings</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={student.fullname}
              disabled
              className="border rounded-lg p-2 bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={student.email}
              disabled
              className="border rounded-lg p-2 bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>
      </section>

      {/* Privacy & Security */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Privacy & Security</h2>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="newPassword" className="font-medium mb-1">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border rounded-lg p-2"
            />
             {newPassword.length > 0 && <PasswordRequirements validations={teacherValidations} />}
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="font-medium mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border rounded-lg p-2"
            />
          </div>
          {teacherError && <p className="text-[red] text-center w-full">{teacherError}</p>}

          <button
            onClick={handleChangePassword}
            className="px-6 py-2 bg-[green] text-white rounded-lg hover:bg-green-700"
            disabled={teacherLoading || !isTeacherPasswordValid || newPassword !== confirmPassword }
         >
            Change Password
          </button>

          {confirmPassword && newPassword !== confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
                  )}
                
          <hr className="my-4" />
          {/* <button
            onClick={handleDeleteAccount}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete Account
          </button> */}
        </div>
      </section>

      {/* Terms & Services */}
      {/* <section className="text-center">
        <a
          href="/terms"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Terms &amp; Services
        </a>
      </section> */}
    </div>
    
    </SidebarProvider>
  );
};

export default ProfilePage;
