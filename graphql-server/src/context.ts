import {PrismaClient} from '@prisma/client'

const expressJwt = require("express-jwt");

export interface Context {
    user: any;
    prisma: PrismaClient;
}

const prisma = new PrismaClient()
export const context: Context = {
  prisma: prisma,
}

