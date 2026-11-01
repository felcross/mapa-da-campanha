import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    env: {
      NODE_ENV: "test",
      LOG_LEVEL: "silent",
      DATABASE_URL:
        "postgresql://rpgmap:rpgmap_dev@localhost:5433/rpgmap_test?schema=public",
    },
  },
});
