"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type MascotFloatProps = { src: string; alt: string; size?: number; className?: string };

export function MascotFloat({ src, alt, size = 320, className = "" }: MascotFloatProps) {
  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className={className}
    >
      <Image src={src} alt={alt} width={size} height={size} priority className="h-auto w-full" />
    </motion.div>
  );
}
