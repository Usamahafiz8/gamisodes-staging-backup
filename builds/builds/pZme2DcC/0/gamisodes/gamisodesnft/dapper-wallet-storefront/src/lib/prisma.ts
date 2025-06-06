// lib/prisma.ts
import { PrismaClient } from "@prisma/client"

let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    // log: ["query", "error"],
  })
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      // log: ["query", "error"],
    })
  }
  prisma = global.prisma
}

export default prisma
