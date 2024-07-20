const { db } = require('@vercel/postgres');
const generateHexId = require('./generateHexId');
const bcrypt = require("bcrypt");
        
const dropTables = async (client) => {
    await client.sql`DROP TABLE IF EXISTS shortLink_users;`;
    await client.sql`DROP TABLE IF EXISTS shortLink;`;
    await client.sql`DROP TABLE IF EXISTS users;`;
}

const seedShortLink = async (client) => { 

    try {

        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        await client.sql`
            CREATE TABLE IF NOT EXISTS shortLink (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                link VARCHAR(4) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`;

        await client.sql`CREATE UNIQUE INDEX idx_unique_link ON shortLink (link);`

        const rows = 1000;

        for (let i = 0; i < rows; i++) { 
            await client.sql`
            INSERT INTO shortLink (link) VALUES (${generateHexId(4)})
            ON CONFLICT (link) DO NOTHING;`;
        }

        console.log("shortLink table seeded")

    } catch (error) {
        console.log("shortLink", error)
    }
}

const seedUsers = async (client) => { 
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "users" table if it doesn't exist
    await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    const name = "admin";
    const email = "admin@example.com";
    const password = "admin";
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert a user if one doesn't already exist
        await client.sql`
        INSERT INTO users (name, email, password)
        VALUES (${name}, ${email}, ${hashedPassword})
        ON CONFLICT (email) DO NOTHING;
        `;

    console.log(`users table seeded`);
}

const seedShortLinkUsers = async (client) => { 

    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
        CREATE TABLE shortLink_users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        shortlink_id UUID NOT NULL,
        original_link TEXT,
        isActive BOOLEAN NOT NULL DEFAULT TRUE,
        description TEXT,
        views INTEGER NOT NULL DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES "users" (id) ON DELETE CASCADE,
        FOREIGN KEY (shortlink_id) REFERENCES shortLink (id) ON DELETE CASCADE
    );`

    console.log("shortLink_users table seeded");
}

async function main() { 
    const client = await db.connect();

    await dropTables(client);

    await seedShortLink(client);

    await seedUsers(client);

    await seedShortLinkUsers(client);

    await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});