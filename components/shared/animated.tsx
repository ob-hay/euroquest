"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedCitiesGridProps {
  children: ReactNode;
}

export default function AnimatedCitiesGrid({
  children,
}: AnimatedCitiesGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  // Animation variants for individual cards
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  return (
    <motion.div
      className="grid gap-4"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{
        staggerChildren: 0.08,
        delayChildren: 0.15,
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedCityCard({ children }: { children: ReactNode }) {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      transition={{
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{
        y: -3,
        transition: {
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1],
          type: "spring",
          stiffness: 300,
          damping: 20,
        },
      }}
      whileTap={{
        scale: 0.99,
        transition: {
          duration: 0.1,
          ease: [0.25, 0.1, 0.25, 1],
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Courses List Animation Components
export function AnimatedCoursesList({ children }: { children: ReactNode }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="flex flex-col gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{
        staggerChildren: 0.12,
        delayChildren: 0.15,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedCourseCard({ children }: { children: ReactNode }) {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 25,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        type: "spring",
        stiffness: 120,
        damping: 18,
      }}
      whileHover={{
        y: -4,
        scale: 1.01,
        transition: {
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1],
          type: "spring",
          stiffness: 400,
          damping: 25,
        },
      }}
      whileTap={{
        scale: 0.98,
        y: -1,
        transition: {
          duration: 0.15,
          ease: [0.25, 0.1, 0.25, 1],
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Categories Animation Components
export function AnimatedCategoriesGrid({ children }: { children: ReactNode }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="grid gap-4"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedCategoryCard({ children }: { children: ReactNode }) {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
    >
      {children}
    </motion.div>
  );
}
