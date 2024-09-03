import fsPromises from "fs/promises";

await fsPromises.rename("README.md", "README.github.md");
await fsPromises.rename("README.marketplace.md", "README.md");