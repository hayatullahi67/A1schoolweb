"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { CategoryType } from "@/lib/types";

interface CategoriesSectionProps {
  visibleCategories: CategoryType[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  prevSlide: () => void;
  nextSlide: () => void;
}

export default function CategoriesSection({
  visibleCategories,
  activeCategory,
  setActiveCategory,
  prevSlide,
  nextSlide,
}: CategoriesSectionProps) {
  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Browse Top Categories
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our most popular course categories
            </p>
          </motion.div>

          <div className="mt-4 flex w-full max-w-md flex-wrap items-center justify-center gap-2">
            <Button
              variant={activeCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("all")}
            >
              All
            </Button>
            <Button
              variant={activeCategory === "development" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("development")}
            >
              Development
            </Button>
            <Button
              variant={activeCategory === "business" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("business")}
            >
              Business
            </Button>
            <Button
              variant={activeCategory === "creative" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("creative")}
            >
              Creative
            </Button>
          </div>
        </div>

        <div className="relative mt-8">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="w-full overflow-hidden px-4">
              <div className="flex gap-4 transition-all duration-500 ease-in-out">
                {visibleCategories.map((category, index) => (
                  <div
                    key={`${category.name}-${index}`}
                    className="w-full min-w-[150px] flex-1 sm:min-w-[180px]"
                  >
                    <Link href={`/category/${category.slug}`}>
                      <Card className="h-full border border-gray-200 bg-white transition-all hover:scale-105 hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
                        <CardContent className="flex flex-col items-center justify-center p-6">
                          <category.icon className="mb-2 h-10 w-10 text-primary" />
                          <h3 className="text-center font-medium text-gray-900 dark:text-white">
                            {category.name}
                          </h3>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {category.courses}+ courses
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              size="icon"
              className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full"
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
