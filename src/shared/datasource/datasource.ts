import AppDataSource from "./datasourceConfig";

const initializeDataSource = async () => {
  try {
    if (AppDataSource.isInitialized) {
      console.log("Data source already connected");
      return AppDataSource;
    }
    const result = await AppDataSource.initialize();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export default initializeDataSource;
