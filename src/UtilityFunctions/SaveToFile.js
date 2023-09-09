// This functions is used to create a new text file that takes some state and stores it into that text file
// This function will be the one converting state to string

import { writeTextFile, BaseDirectory } from "@tauri-apps/api/fs";

function saveToFile(state, fileName) {
  writeTextFile(
    `${fileName}.txt`, // File name
    JSON.stringify(state), // Content to store
    { dir: BaseDirectory.AppData } //Location
  )
    .then(() => {
      return true; // Success
    })
    .catch((error) => {
      return false; // Error
    });
}

export default saveToFile;
