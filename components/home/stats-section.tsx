"use client";

import { motion } from "framer-motion";
import { BookOpen, CheckCircle, Star, Users } from "lucide-react";

export default function StatsSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <motion.div
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div
            className="flex flex-col items-center justify-center space-y-2 rounded-lg border p-6 transition-all hover:border-primary/50 hover:shadow-md"
            variants={fadeInUp}
          >
            <Users className="h-12 w-12 text-primary" />
            <motion.h3
              className="text-3xl font-bold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              10K+
            </motion.h3>
            <p className="text-center text-muted-foreground">Active Students</p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center justify-center space-y-2 rounded-lg border p-6 transition-all hover:border-primary/50 hover:shadow-md"
            variants={fadeInUp}
          >
            <BookOpen className="h-12 w-12 text-primary" />
            <motion.h3
              className="text-3xl font-bold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              500+
            </motion.h3>
            <p className="text-center text-muted-foreground">Quality Courses</p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center justify-center space-y-2 rounded-lg border p-6 transition-all hover:border-primary/50 hover:shadow-md"
            variants={fadeInUp}
          >
            <CheckCircle className="h-12 w-12 text-primary" />
            <motion.h3
              className="text-3xl font-bold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              100%
            </motion.h3>
            <p className="text-center text-muted-foreground">Completion Rate</p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center justify-center space-y-2 rounded-lg border p-6 transition-all hover:border-primary/50 hover:shadow-md"
            variants={fadeInUp}
          >
            <Star className="h-12 w-12 text-primary" />
            <motion.h3
              className="text-3xl font-bold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              4.8/5
            </motion.h3>
            <p className="text-center text-muted-foreground">
              Student Satisfaction
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
