import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log("Starting library database seed...");

  const genreData = [
    {
      name: "Fiction",
      description: "Novels, imaginative stories and literary works.",
    },
    {
      name: "Science",
      description: "Scientific discoveries and the natural world.",
    },
    {
      name: "Technology",
      description: "Computing, programming and technological innovation.",
    },
    {
      name: "History",
      description: "Historical events, people and civilizations.",
    },
  ];

  const genreIds = new Map<string, string>();

  for (const genre of genreData) {
    const savedGenre = await prisma.genre.upsert({
      where: { name: genre.name },
      update: { description: genre.description },
      create: genre,
    });

    genreIds.set(savedGenre.name, savedGenre.id);
  }

  const fictionId = genreIds.get("Fiction")!;
  const scienceId = genreIds.get("Science")!;
  const technologyId = genreIds.get("Technology")!;
  const historyId = genreIds.get("History")!;

  const books = [
    // FICTION
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

    // SCIENCE
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
    },
    {
      title: "Cosmos",
      author: "Carl Sagan",
      isbn: "9780345539434",
      publishedYear: 1980,
      genreId: scienceId,
    },
    {
      title: "On the Origin of Species",
      author: "Charles Darwin",
      isbn: "9781509827695",
      publishedYear: 1859,
      genreId: scienceId,
    },
    {
      title: "The Elegant Universe",
      author: "Brian Greene",
      isbn: "9780393338102",
      publishedYear: 1999,
      genreId: scienceId,
    },

    // TECHNOLOGY
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      isbn: "9780132350884",
      publishedYear: 2008,
      genreId: technologyId,
    },
    {
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt and David Thomas",
      isbn: "9780135957059",
      publishedYear: 1999,
      genreId: technologyId,
    },
    {
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, and Clifford Stein",
      isbn: "9780262046305",
      publishedYear: 2022,
      genreId: technologyId,
    },
    {
      title: "Design Patterns",
      author: "Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides",
      isbn: "9780201633610",
      publishedYear: 1994,
      genreId: technologyId,
    },
    {
      title: "The Phoenix Project",
      author: "Gene Kim, Kevin Behr, and George Spafford",
      isbn: "9781942788294",
      publishedYear: 2013,
      genreId: technologyId,
    },

    // HISTORY
    {
      title: "Sapiens",
      author: "Yuval Noah Harari",
      isbn: "9780062316097",
      publishedYear: 2011,
      genreId: historyId,
    },
    {
      title: "Guns, Germs, and Steel",
      author: "Jared Diamond",
      isbn: "9780393354324",
      publishedYear: 1997,
      genreId: historyId,
    },
    {
      title: "The Diary of a Young Girl",
      author: "Anne Frank",
      isbn: "9780553296983",
      publishedYear: 1947,
      genreId: historyId,
    },
    {
      title: "The Silk Roads",
      author: "Peter Frankopan",
      isbn: "9781101912379",
      publishedYear: 2015,
      genreId: historyId,
    },
    {
      title: "A People's History of the United States",
      author: "Howard Zinn",
      isbn: "9780062397348",
      publishedYear: 1980,
      genreId: historyId,
    },
  ];

  for (const book of books) {
    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: {
        title: book.title,
        author: book.author,
        publishedYear: book.publishedYear,
        genreId: book.genreId,
      },
      create: book,
    });
  }

  const genreCount = await prisma.genre.count();
  const bookCount = await prisma.book.count();

  console.log(`Genres in database: ${genreCount}`);
  console.log(`Books in database: ${bookCount}`);
  console.log("Library database seed completed successfully.");
}

main()
  .catch((error: unknown) => {
    console.error("Database seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
