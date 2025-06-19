import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {

  const tagsData = [
    { name: 'tradicional' },
    { name: 'com leite' },
    { name: 'gelado' },
    { name: 'especial' },
  ];

  const tags = await Promise.all(
    tagsData.map((tag) => prisma.tag.upsert({
      where: { name: tag.name },
      update: {},
      create: tag,
    }))
  );

  const coffeesData = [
    {
      name: 'Expresso Tradicionalllllllllllll',
      description: 'O tradicional café feito com água quente e grãos moídos.',
      price: 9.90,
      imageUrl: 'https://example.com/expresso.png',
      tagNames: ['tradicional'],
    },
  ];

  for (const coffee of coffeesData) {
    const createdCoffee = await prisma.coffee.create({
      data: {
        name: coffee.name,
        description: coffee.description,
        price: coffee.price,
        imageUrl: coffee.imageUrl,
        tags: {
          create: coffee.tagNames.map((tagName) => ({
            tag: { connect: { name: tagName } },
          })),
        },
      },
    });

    console.log(` Café criado: ${createdCoffee.name}`);
  }

  console.log('Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
