"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPlay, FaPhoneAlt, FaUsers, FaShieldAlt } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";
import { FiArrowRight } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import girl from "@/public/images/A1logo2.png"
import uxdesigner from "@/public/images/uxdesigner.jpeg"
import david from "@/public/images/david.jpeg"
import A1logo from "@/public/images/A1logo2.png"


import { Button } from "@/components/ui/button";
import Header from "@/components/header";
// import { Link } from "lucide-react";
import Footer from "@/components/footer";

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
    <Header />
     <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#2563eb] py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="space-y-4 md:space-y-6 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  We are Passionate About Building Tools for the Classroom
                </h1>
                <p className="text-white/90 text-base md:text-lg">
                  Our mission is to empower educators with innovative technology
                  that enhances the learning experience. We create intuitive
                  tools that make teaching more effective and learning more
                  engaging.
                </p>
                <Button className="bg-white text-[#2563eb] hover:bg-white/90 font-medium px-6 py-2 rounded-full">
                  START FREE TRIAL
                </Button>
              </div>
              <div className="relative aspect-video bg-white/20 rounded-lg flex items-center justify-center mt-4 md:mt-0">
                <div className="absolute inset-0 bg-white/10 rounded-lg"></div>
                <button className="relative z-10 bg-[#2563eb] hover:bg-[#1e4bb8] transition-colors rounded-full p-4 text-white">
                  <FaPlay className="w-8 h-8 text-white" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-gray-600">
                Founded in 2015, our journey began with a simple idea: to make
                education more accessible and engaging through technology. What
                started as a small team of passionate educators and developers
                has grown into a comprehensive learning platform trusted by
                institutions worldwide.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-[#f1f3f4] p-6 md:p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-[#2563eb]/20 text-[#2563eb] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaPhoneAlt className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
                <p className="text-gray-600">
                  Our dedicated support team is always available to help you
                  with any questions or issues.
                </p>
              </div>
              <div className="bg-[#f1f3f4] p-6 md:p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-[#2563eb]/20 text-[#2563eb] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaShieldAlt className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-2">Secure Platform</h3>
                <p className="text-gray-600">
                  We prioritize the security of your data with enterprise-grade
                  protection and regular audits.
                </p>
              </div>
              <div className="bg-[#f1f3f4] p-6 md:p-8 rounded-lg text-center sm:col-span-2 md:col-span-1">
                <div className="w-16 h-16 bg-[#2563eb]/20 text-[#2563eb] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUsers className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community</h3>
                <p className="text-gray-600">
                  Join our growing community of educators and learners to share
                  ideas and best practices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="order-2 md:order-1">
                <Image
                  src={A1logo}
                  alt="Our mission"
                  width={400}
                  height={400}
                  className="rounded-lg object-cover  h-[400px]"
                />
              </div>
              <div className="space-y-6 order-1 md:order-2">
                <h2 className="text-2xl md:text-3xl font-bold">
                  Our Mission & Values
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#2563eb]/20 text-[#2563eb] rounded-full flex items-center justify-center flex-shrink-0">
                      <MdCheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Innovation</h3>
                      <p className="text-gray-600">
                        We constantly push the boundaries of what is
                        possible in educational technology.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#2563eb]/20 text-[#2563eb] rounded-full flex items-center justify-center flex-shrink-0">
                      <MdCheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Accessibility</h3>
                      <p className="text-gray-600">
                        We believe education should be accessible to everyone,
                        regardless of background or ability.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#2563eb]/20 text-[#2563eb] rounded-full flex items-center justify-center flex-shrink-0">
                      <MdCheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Quality</h3>
                      <p className="text-gray-600">
                        We are committed to delivering the highest quality
                        educational tools and content.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 md:py-20 bg-[#2563eb]/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                What Our Users Say
              </h2>
              <p className="text-gray-600">
                Hear from educators and students who have transformed their
                teaching and learning experience with our platform.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white p-6 md:p-8 rounded-lg shadow-sm"
                >
                  <div className="flex items-center text-yellow-400 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <AiFillStar key={j} className="w-5 h-5" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6">
                    `&quot;This platform has completely transformed how I teach
                    my classes. The tools are intuitive and my students are more
                    engaged than ever before.`&quot;
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 overflow-hidden">
                      <Image
                        src={david}
                        alt="User"
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">David Olawuyi</h4>
                      {/* <p className="text-sm text-gray-500">
                        Position, Organization
                      </p> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-20 bg-[#2563eb]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
              Ready to Transform Your Classroom?
            </h2>
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto mb-6 md:mb-8">
              Join thousands of educators who are already using our platform to
              create engaging learning experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               
               <Button className="bg-white text-[#2563eb] hover:bg-white/90 font-medium px-6 py-2 rounded-full">
              
              
               <Link href="/register"> START FREE TRIAL</Link>
                
              </Button>
               

             
            
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-medium px-6 py-2 rounded-full"
              >
                   <Link href="/register">CONTACT SALES</Link>
                
              </Button>
           
              
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
    </>
   
  );
}
