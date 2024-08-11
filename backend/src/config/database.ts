import { connect } from "@tidbcloud/serverless";
import { drizzle } from "drizzle-orm/tidb-serverless";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();
if (!process.env.DBURL) {
  throw new Error("DBURL environment variable is not set");
}

const client = connect({
  url: "mysql://3b8yYsB18uDCWtw.root:T12X4hPBWVkwRv8X@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/test",
});

// Create the Drizzle instance
export const db = drizzle(client);
