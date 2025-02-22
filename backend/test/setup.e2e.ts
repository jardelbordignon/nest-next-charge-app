import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { PrismaClient } from '@prisma/client'
import { startApi, stopApi } from './api'
import 'dotenv/config'

const prismaClient = new PrismaClient()
const schemaId = randomUUID()
  .replace(/[^a-z]/g, '')
  .substring(0, 8)

function generateTestDatabaseUrl() {
  if (!process.env.DATABASE_URL)
    throw new Error('Please provide a DATABASE_URL environment variable.')

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schemaId)

  return url.toString()
}

beforeAll(async () => {
  process.env.DATABASE_URL = generateTestDatabaseUrl()
  execSync('npx prisma migrate deploy')

  global.api = await startApi()
})

afterAll(async () => {
  await stopApi()
  await prismaClient.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await prismaClient.$disconnect()
})
