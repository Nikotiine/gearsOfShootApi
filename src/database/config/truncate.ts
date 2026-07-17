import { dataSource } from './data-source.config';

async function truncate() {
  await dataSource.initialize();

  const entities = dataSource.entityMetadatas;

  await dataSource.query('SET session_replication_role = replica;');

  for (const entity of entities) {
    await dataSource.query(
      `TRUNCATE TABLE "${entity.tableName}" RESTART IDENTITY CASCADE;`,
    );
  }

  await dataSource.query('SET session_replication_role = DEFAULT;');

  await dataSource.destroy();
}

truncate()
  .then(() => {
    console.log('Database truncated');
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
