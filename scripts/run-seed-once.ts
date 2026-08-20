import { seedDatabase } from '../src/lib/seed';

seedDatabase()
  .then(() => {
    console.log('Seed run complete.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Seed run failed:', err);
    process.exit(1);
  });
