const express = require("express");
const cors = require("cors");
const { CosmosClient } = require("@azure/cosmos");
const app = express();
const port = process.env.PORT || 9000;
require("dotenv").config();

app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Initialize Cosmos DB client
const endpoint = process.env.COSMOS_DB_ENDPOINT;
const key = process.env.COSMOS_DB_KEY;
const client = new CosmosClient({ endpoint, key });
const databaseId = process.env.DATABASE_ID;
const containerId = process.env.CONTAINER_ID;

app.use(express.static(path.join(__dirname, "../frontend/build")));

// Dynamic POST endpoint to handle document-related requests
app.post("/:action/:slug", async (req, res) => {
  const { action, slug } = req.params;
  let data = req.body;
  data = { webhook_payload: data, endpoint: `${action}/${slug}` };
  console.log(`called the endpoint ${action}/${slug}`);
  console.log(JSON.stringify(data, undefined, 4)); // Display the incoming data

  try {
    const { database } = await client.databases.createIfNotExists({
      id: databaseId,
    });
    const { container } = await database.containers.createIfNotExists({
      id: containerId,
    });

    const { resource: createdItem } = await container.items.create(data);
    console.log(`Created item with id: ${createdItem.id}`);

    res.send(`Document ${action} for ${client} saved successfully`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving document");
  }
});

app.get("/documents", async (req, res) => {
  try {
    const { database } = await client.databases.createIfNotExists({
      id: databaseId,
    });
    const { container } = await database.containers.createIfNotExists({
      id: containerId,
    });

    const querySpec = {
      query: "SELECT * FROM c ORDER BY c.created_at DESC",
    };

    const { resources: items } = await container.items
      .query(querySpec)
      .fetchAll();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error reading documents");
  }
});

// Catch-all route for React frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
