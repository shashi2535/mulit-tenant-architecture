import dotenv from "dotenv"
dotenv.config()
export const config = {
  LOGGER:{
    COLORS: {
      error: "red",
      warn: "pink",
      info: "yellow",
      debug: "blue",
    },
    FORMAT: "YYYY-MM-DD HH:mm:ss"
  },
  DB:{
    DB_DATABASE: process.env.DB_NAME,
    DB_DIALECT: process.env.DB_DRIVER,
    DB_HOST: process.env.DB_HOST,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_USERNAME: process.env.DB_USER,
    DB_PORT: process.env.DB_PORT
  }
};

