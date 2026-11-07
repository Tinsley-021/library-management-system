{
  "name": "library-management-api",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:seed": "prisma db seed",
    "prisma:studio": "prisma studio"
  },
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@prisma/client": "^6.19.0",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "prisma": "^6.19.0",
    "ts-node": "^10.9.2",
    "typescript": "^5.7.0"
  },
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
}
