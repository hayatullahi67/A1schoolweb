"use client";

import React from "react";
import Image from "next/image";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function ContactPage() {
  return (
   <>
   <Header />
    <div className="bg-white w-[100%] text-gray-800">
   {/* Main Content */}
   <main className="  py-12 ">
     {/* Intro Text */}
     <section className="text-center  mx-auto ">
       <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
         Get in Touch with Us Today!
       </h1>
       <p className="text-gray-600 max-w-2xl mx-auto">
         At A1, we welcome your inquiries, feedback, and collaboration. Reach
         out via any channel below and our team will assist you promptly.
       </p>
     </section>

     {/* Contact via Email */}
     <section>
       <h2 className="text-2xl font-semibold text-center mb-6">
         Contact Us Via Email
       </h2>
       <ul className="max-w-xl mx-auto space-y-4">
         <li className="flex items-center justify-between">
           <div className="flex items-center space-x-3">
             <FaEnvelope className="text-blue-600 w-6 h-6" />
             <span>General Inquiries</span>
           </div>
           <a
             href="mailto:info@a1.com"
             className="text-blue-600 hover:underline"
           >
             info@a1.com
           </a>
         </li>
         <li className="flex items-center justify-between">
           <div className="flex items-center space-x-3">
             <FaEnvelope className="text-blue-600 w-6 h-6" />
             <span>Business Collaborations</span>
           </div>
           <a
             href="mailto:partners@a1.com"
             className="text-blue-600 hover:underline"
           >
             partners@a1.com
           </a>
         </li>
         <li className="flex items-center justify-between">
           <div className="flex items-center space-x-3">
             <FaEnvelope className="text-blue-600 w-6 h-6" />
             <span>Job Opportunities</span>
           </div>
           <a
             href="mailto:careers@a1.com"
             className="text-blue-600 hover:underline"
           >
             careers@a1.com
           </a>
         </li>
       </ul>
     </section>

     {/* Contact via Phone */}
     <section>
       <h2 className="text-2xl font-semibold text-center mb-6">
         Contact Us By Phone
       </h2>
       <ul className="max-w-xl mx-auto space-y-4">
         <li className="flex items-center justify-between">
           <div className="flex items-center space-x-3">
             <FaPhoneAlt className="text-blue-600 w-6 h-6" />
             <span>General Inquiries</span>
           </div>
           <a
             href="tel:+11112223333"
             className="text-blue-600 hover:underline"
           >
             +1 (111) 222-3333
           </a>
         </li>
         <li className="flex items-center justify-between">
           <div className="flex items-center space-x-3">
             <FaPhoneAlt className="text-blue-600 w-6 h-6" />
             <span>Business Collaborations</span>
           </div>
           <a
             href="tel:+14445556666"
             className="text-blue-600 hover:underline"
           >
             +1 (444) 555-6666
           </a>
         </li>
         <li className="flex items-center justify-between">
           <div className="flex items-center space-x-3">
             <FaPhoneAlt className="text-blue-600 w-6 h-6" />
             <span>Free Consultation</span>
           </div>
           <a
             href="tel:+17778889999"
             className="text-blue-600 hover:underline"
           >
             +1 (777) 888-9999
           </a>
         </li>
       </ul>
     </section>

     {/* Office Locations */}
     <section>
       <h2 className="text-2xl font-semibold text-center mb-6">
         Office Locations
       </h2>
       <ul className="max-w-xl mx-auto space-y-6">
         <li className="flex items-start space-x-4">
           <FaMapMarkerAlt className="text-blue-600 w-6 h-6 mt-1" />
           <div>
             <strong>New York City</strong>
             <p>123 A1 Avenue, Suite 100, New York, NY 10001</p>
           </div>
         </li>
         <li className="flex items-start space-x-4">
           <FaMapMarkerAlt className="text-blue-600 w-6 h-6 mt-1" />
           <div>
             <strong>San Francisco</strong>
             <p>456 A1 Street, Floor 5, San Francisco, CA 94105</p>
           </div>
         </li>
       </ul>
     </section>

     {/* Response & Privacy */}
     <section className="grid mx-auto w-[60%] md:grid-cols-2 gap-6">
       <div className="bg-gray-50 p-6 rounded-lg">
         <h3 className="font-semibold mb-2">Our Response</h3>
         <p className="text-gray-600">
           We commit to timely responses and will guide you through every
           step, from project inquiries to partnership discussions.
         </p>
       </div>
       <div className="bg-gray-50 p-6 rounded-lg">
         <h3 className="font-semibold mb-2">Privacy Assurance</h3>
         <p className="text-gray-600">
           Your privacy matters. We adhere to strict policies and never share
           your data without consent.
         </p>
       </div>
     </section>

     {/* Social & Thank You */}
     <section className="text-center space-y-4">
       <p>Join us on social media</p>
       <div className="flex justify-center space-x-6 text-blue-600">
         {/* <a href="#">
           <FaLinkedinIn className="w-6 h-6 hover:text-blue-800" />
         </a> */}
         <a href="https://www.instagram.com/officiala1school ">
           <FaInstagram className="w-6 h-6 hover:text-blue-800" />
         </a>
         {/* <a href="#">
           <FaTwitter className="w-6 h-6 hover:text-blue-800" />
         </a> */}
       </div>
       <p className="text-gray-500">
         Thank you for considering A1 for your digital needs.
       </p>
     </section>

     {/* CTA Banner */}
     <section className="bg-[blue] text-white py-12 mt-[30px] w-[100%] text-center">
       <h2 className="text-3xl font-bold mb-4">
         Ready to Boost Your Digital Presence?
       </h2>
       <p className="mb-6 max-w-xl mx-auto">
         Unlock your potential with tailored solutions that drive real
         results.
       </p>
       <div className="flex justify-center space-x-4">
         <a
           href="/register"
           className="px-6 py-3 bg-white text-[blue] font-semibold rounded-lg hover:bg-gray-100"
         >
           Get Started
         </a>
         <a
           href="/register"
           className="px-6 py-3 border border-white rounded-lg hover:bg-white/20"
         >
           Free Consultation
         </a>
       </div>
     </section>

     {/* Logo Showcase */}
     {/* <section className="flex justify-center mt-12">
       <Image src="/logo-large.svg" alt="A1 logo" width={300} height={80} />
     </section> */}
   </main>
 </div>
 <Footer />
 </>
  );
}
