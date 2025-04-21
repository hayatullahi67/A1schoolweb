"use client";

import { useState, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/home/hero-section";
import CategoriesSection from "@/components/home/categories-section";
import CoursesSection from "@/components/home/courses-section";
import StatsSection from "@/components/home/stats-section";
import TestimonialsSection from "@/components/home/testimonials-section";
import CtaSection from "@/components/home/cta-section";
import { categories, featuredCourses, testimonials } from "@/lib/sample-data";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCategories, setVisibleCategories] = useState<typeof categories>(
    []
  );
  const [startIndex, setStartIndex] = useState(0);
  const itemsToShow = 6;

  // Filter categories based on active filter
  useEffect(() => {
    if (activeCategory === "all") {
      setVisibleCategories(
        categories.slice(startIndex, startIndex + itemsToShow)
      );
    } else {
      const filtered = categories.filter((cat) => cat.group === activeCategory);
      setVisibleCategories(filtered.slice(0, itemsToShow));
    }
  }, [activeCategory, startIndex]);

  const nextSlide = () => {
    if (startIndex + itemsToShow < categories.length) {
      setStartIndex(startIndex + 1);
    } else {
      setStartIndex(0);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    } else {
      setStartIndex(Math.max(0, categories.length - itemsToShow));
    }
  };

  // Auto-scroll categories
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     nextSlide();
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [startIndex]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <CategoriesSection
          visibleCategories={visibleCategories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          prevSlide={prevSlide}
          nextSlide={nextSlide}
        />
        <CoursesSection featuredCourses={featuredCourses} />
        <StatsSection />
        <TestimonialsSection testimonials={testimonials} />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
