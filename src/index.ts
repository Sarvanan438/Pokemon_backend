import initializeDataSource from "./shared/datasource/datasource";

initializeDataSource()
  .then(async (datasource) => {
    try {
      const setupApp = await import("./app");

      if (datasource) {
        await setupApp.default(datasource);
      }
    } catch (e) {
      console.log(e);
    }
  })
  .catch((e) => "failed to connect to datasource");
