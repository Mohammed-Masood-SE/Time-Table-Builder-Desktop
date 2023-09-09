// This function is used to create the initial directory if it does not exist AKA the TimeTableBuilder Directory
// Where all the data will be stored
import { createDir, exists, BaseDirectory } from "@tauri-apps/api/fs";

async function createInitialDirectory() {
  // Used To Create The Initial Directory If It Does Not Exist
  let alreadyExists = await exists("TimeTableBuilder", {
    dir: BaseDirectory.AppData,
  });
  if (!alreadyExists) {
    await createDir("", {
      dir: BaseDirectory.AppData,
      recursive: true,
    });
  }
}

export default createInitialDirectory;
