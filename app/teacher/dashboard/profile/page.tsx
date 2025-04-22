'use client'

import React, {useEffect, useState, ChangeEvent } from "react";
import { NextPage } from "next";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  Check, X } from "lucide-react";

type Instructor = {
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
  const [instructor, setInstructor] = useState<Instructor>({
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
      setInstructor({
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

      if (!instructor.token) {
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
            Authorization: `Bearer ${instructor.token}`,
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
    <div className="max-w-3xl mt-[50px] mb-[50px] mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <ToastContainer/>
      {/* Instructor Profile */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Instructor Profile</h2>
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
            <h3 className="text-xl font-medium">{instructor.fullname}</h3>
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
      <section className="mb-8 ">
        <h2 className="text-2xl  font-semibold mb-4">Settings</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={instructor.fullname}
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
              value={instructor.email}
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
  );
};

export default ProfilePage;
