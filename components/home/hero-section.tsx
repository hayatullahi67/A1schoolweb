"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import ParticlesBackground from "@/components/particles-background";

export default function HeroSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-background py-12 md:py-24 lg:py-32">
      <ParticlesBackground />
      <div className="container relative px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <div className="space-y-2">
              <motion.h1
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                variants={fadeInUp}
              >
                Learn Without Limits
              </motion.h1>
              <motion.p
                className="max-w-[600px] text-muted-foreground md:text-xl"
                variants={fadeInUp}
              >
                Start, switch, or advance your career with thousands of courses
                from expert instructors.
              </motion.p>
            </div>
            <motion.div
              className="flex flex-col gap-2 min-[400px]:flex-row"
              variants={fadeInUp}
            >
              <Link href="/courses">
                <Button size="lg" className="w-full min-[400px]:w-auto">
                  Explore Courses
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full min-[400px]:w-auto"
                >
                  Join for Free
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-4 rounded-xl bg-primary/10 blur-xl"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
              <Image
                src="/images/hero.png"
                width={550}
                height={550}
                alt="Hero Image"
                className="relative rounded-lg object-cover"
                priority
              />
              <motion.div
                className="absolute -right-8 -top-8 rounded-lg bg-white p-4 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">4.8</span>
                  <span className="text-sm text-muted-foreground">
                    (10K+ reviews)
                  </span>
                </div>
              </motion.div>
              <motion.div
                className="absolute -bottom-8 -left-8 rounded-lg bg-white p-4 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-bold">500K+</span>
                  <span className="text-sm text-muted-foreground">
                    students
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
