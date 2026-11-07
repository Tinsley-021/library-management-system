import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log("Starting library catalog seed...");

  // Upsert genres first so every book can reference a real Genre row.
  const genreData = [
    {
      name: "Fiction",
      description: "Imaginative stories, novels, and literary works.",
    },
    {
      name: "Science",
      description: "Scientific ideas, discoveries, and the natural world.",
    },
    {
      name: "Technology",
      description: "Computing, software engineering, and technological innovation.",
    },
    {
      name: "History",
      description: "Historical events, people, and civilizations.",
    },
  ];

  const genres = new Map<string, string>();

  for (const genre of genreData) {
    const savedGenre = await prisma.genre.upsert({
      where: { name: genre.name },
      update: { description: genre.description },
      create: genre,
    });

    genres.set(savedGenre.name, savedGenre.id);
  }

  const fictionId = genres.get("Fiction")!;
  const scienceId = genres.get("Science")!;
  const technologyId = genres.get("Technology")!;
  const historyId = genres.get("History")!;

  const books = [
    // Fiction: 5 books
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      isbn: "9780061120084",
      publishedYear: 1960,
      genreId: fictionId,
    },
    {
      title: "1984",
      author: "George Orwell",
      isbn: "9780451524935",
      publishedYear: 1949,
      genreId: fictionId,
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      isbn: "9780141439518",
      publishedYear: 1813,
      genreId: fictionId,
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "9780743273565",
      publishedYear: 1925,
      genreId: fictionId,
    },
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      isbn: "9780547928227",
      publishedYear: 1937,
      genreId: fictionId,
    },

    // Science: 5 books
    {
      title: "A Brief History of Time",
      author: "Stephen Hawking",
      isbn: "9780553380163",
      publishedYear: 1988,
      genreId: scienceId,
    },
    {
      title: "The Selfish Gene",
      author: "Richard Dawkins",
      isbn: "9780198788607",
      publishedYear: 1976,
      genreId: scienceId,
