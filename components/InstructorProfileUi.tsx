import React, { useState, ChangeEvent } from "react";
import { NextPage } from "next";

const ProfilePage: NextPage = () => {
  // Mock data - replace with real user data from API
  const [instructorName] = useState<string>("John Doe");
  const [userEmail] = useState<string>("john.doe@example.com");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

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

  const handlePasswordChange = () => {
    if (newPassword && newPassword === confirmPassword) {
      // TODO: call API to change password
      alert("Password changed successfully");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      alert("Passwords do not match");
    }
  };

  const handleDeleteAccount = () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      // TODO: call API to delete account
      alert("Account deleted");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      {/* Instructor Profile */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Instructor Profile</h2>
        <div className="flex items-center space-x-4">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile Image"
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
          <div>
            <h3 className="text-xl font-medium">{instructorName}</h3>
            <label className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700">
              Change Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
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
              value={instructorName}
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
              value={userEmail}
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
          <button
            onClick={handlePasswordChange}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Change Password
          </button>
          <hr className="my-4" />
          <button
            onClick={handleDeleteAccount}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete Account
          </button>
        </div>
      </section>

      {/* Terms & Services */}
      <section className="text-center">
        <a
          href="/terms"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Terms &amp; Services
        </a>
      </section>
    </div>
  );
};

export default ProfilePage;
