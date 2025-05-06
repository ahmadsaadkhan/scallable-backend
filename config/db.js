const { CosmosClient } = require('@azure/cosmos');
const dotenv = require('dotenv');
dotenv.config();

// Load environment variables
const endpoint = process.env.COSMOS_DB_ENDPOINT;
const key = process.env.COSMOS_DB_KEY;
const databaseId = process.env.COSMOS_DB_DATABASE_ID;
const postsContainerId = process.env.COSMOS_DB_POSTS_CONTAINER_ID;
const commentsContainerId = process.env.COSMOS_DB_COMMENTS_CONTAINER_ID;

// Simple check
if (!endpoint || !key) {
  throw new Error('Missing Cosmos DB connection info. Check your .env file!');
}

const client = new CosmosClient({ endpoint, key });

const db = client.database(databaseId);
const postsContainer = db.container(postsContainerId);
const commentsContainer = db.container(commentsContainerId);

module.exports = {
  postsContainer,
  commentsContainer,
};
