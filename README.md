
# Library Management System

## Project Overview

The Library Management System is a relational database project designed to manage books, genres, users and book reviews.

The system uses PostgreSQL as its database and Prisma ORM to define models, manage relationships, perform migrations and interact with database records.

The project demonstrates relational database design, foreign-key relationships, database seeding and backend database connection management.

## Technologies Used

- PostgreSQL
- Prisma ORM
- TypeScript
- NestJS
- Node.js

## Project Structure

```text
library-management-system/
│
├── api/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   │
│   ├── src/
│   │   └── prisma/
│   │       └── prisma.service.ts
│   │
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

## Database Models

### 1. Role

The Role enum defines the two types of users supported by the system:

- PATRON: A regular library member.
- LIBRARIAN: A library staff member responsible for managing library resources.

Using an enum prevents invalid role values from being stored.

### 2. User

The User model stores information about registered library users.

Fields include:

- id: Unique user identifier.
- name: User's full name.
- email: Unique email address.
- password: Password hash.
- role: User's assigned role.
- createdAt: Account creation date.
- updatedAt: Last account update.

The default role is PATRON.

Passwords must be hashed by the application before they are stored.

### 3. Genre

The Genre model represents book categories.

Fields include:

- id: Unique genre identifier.
- name: Unique genre name.
- description: Optional genre description.
- books: Related books.
- createdAt: Creation timestamp.
- updatedAt: Last update timestamp.

A genre can contain multiple books.

### 4. Book

The Book model stores information about books in the library.

Fields include:

- id: Unique book identifier.
- title: Book title.
- author: Book author.
- isbn: Unique ISBN.
- description: Optional book description.
- publishedYear: Publication year.
- available: Availability status.
- genreId: Foreign key referencing Genre.
- genre: Related Genre record.

Each book belongs to one genre.

### 5. Review

The Review model allows users to review books.

Fields include:

- id: Unique review identifier.
- rating: Numerical rating.
- comment: Optional written review.
- bookId: Referenced book.
- userId: Referenced user.
- createdAt: Creation timestamp.
- updatedAt: Last update timestamp.

A user can review multiple books, and a book can receive multiple reviews.

The unique constraint on bookId and userId prevents a user from submitting multiple reviews for the same book.

## Schema Decisions

### Why does Book reference Genre instead of embedding it?

The Book model references the Genre model through a foreign key called genreId rather than storing the entire genre information inside each book.

This is a normalized relational database design.

For example, several books can belong to the Fiction genre. Instead of repeating the genre name and description in every book record, each book stores the identifier of the corresponding Genre record.

This design provides several benefits:

1. Reduced data duplication: Genre information is stored once and shared by multiple books.
2. Data consistency: Updating a genre name or description does not require changing every related book.
3. Referential integrity: The foreign key ensures that every book references an existing genre.
4. Easier maintenance: Genres can be created, updated or managed independently.
5. Efficient querying: Prisma can retrieve books together with their related genre information.

The relationship is implemented using Prisma's @relation attribute:

```prisma
genreId String
genre   Genre @relation(fields: [genreId], references: [id])
```

The Genre model contains the opposite relationship:

```prisma
books Book[]
```

This establishes a one-to-many relationship: one genre can have many books, while each book belongs to one genre.

### Why use PostgreSQL instead of a document database?

PostgreSQL is suitable because the library system contains structured data with clear relationships.

Books, genres, users and reviews are connected through foreign keys.

A document database could embed genre information inside every book document. However, this could result in repeated genre data and inconsistent information if a genre changes.

PostgreSQL provides relational constraints, foreign keys and structured queries that make this design appropriate for the project.

## Database Relationships

The database contains the following relationships:

- Genre to Book: One-to-many.
- User to Review: One-to-many.
- Book to Review: One-to-many.

A book belongs to one genre.

A user can create multiple reviews.

A book can receive reviews from multiple users.

## Seed Data

The project includes a seed script located at:

`api/prisma/seed.ts`

The script creates four genres:

1. Fiction
2. Science
3. Technology
4. History

It also creates twenty sample books.

Each genre receives five books.

The seed script uses Prisma upsert operations to prevent duplicate records when it is executed repeatedly.

## Environment Configuration

The project uses an environment variable called DATABASE_URL to connect to PostgreSQL.

The example configuration is stored in:

`api/.env.example`

Copy this file to `.env` and replace the placeholder with your actual PostgreSQL connection details.

Never commit real database credentials to GitHub.

## Installation and Setup

Run the following commands from the api directory.

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

On Windows Command Prompt:

```cmd
copy .env.example .env
```

Update DATABASE_URL in the new .env file.

### 3. Generate Prisma Client

```bash
npx prisma generate
```

### 4. Run database migrations

```bash
npx prisma migrate dev --name init
```

This creates the database tables based on the Prisma schema.

### 5. Seed the database

```bash
npx prisma db seed
```

This inserts the sample genres and books.

### 6. Open Prisma Studio

```bash
npx prisma studio
```

Prisma Studio allows database records to be inspected through a browser interface.

## Expected Results

After successful migration and seeding, the database should contain:

| Model | Expected records |
|---|---:|
| Genre | 4 |
| Book | 20 |
| User | 0 initially |
| Review | 0 initially |

The number of users and reviews will increase as the application is used.

## Assignment Requirements Checklist

- [x] Role enum containing PATRON and LIBRARIAN.
- [x] User model using the Role enum.
- [x] Genre model.
- [x] Book model.
- [x] Book references Genre through genreId.
- [x] Prisma @relation declaration.
- [x] Seed script creates at least four genres.
- [x] Seed script creates at least fifteen books.
- [x] PrismaService extends PrismaClient.
- [x] PrismaService implements OnModuleInit.
- [x] PrismaService calls this.$connect() inside onModuleInit().
- [x] Environment example contains DATABASE_URL.
- [x] Schema Decisions section explains the Book-to-Genre relationship.

## Conclusion

The Library Management System provides a structured relational database foundation for managing library resources.

The implementation uses Prisma ORM and PostgreSQL to maintain data integrity, manage relationships and provide repeatable sample data through database seeding.
