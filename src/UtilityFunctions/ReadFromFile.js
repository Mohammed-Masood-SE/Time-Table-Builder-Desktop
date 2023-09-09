// This function reads through a specific text file , parses the json data and returns you a state
import { readTextFile, BaseDirectory } from "@tauri-apps/api/fs";

async function readFromFile(fileName) {
  try {
    const contents = await readTextFile(fileName, {
      dir: BaseDirectory.AppData,
    });
    return JSON.parse(contents);
  } catch (error) {
    throw error;
  }
}

export default readFromFile;
