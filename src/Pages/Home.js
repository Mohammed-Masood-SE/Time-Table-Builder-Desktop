import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import NavBar from "../Components/NavBar";
import styles from "../Styles/Home.module.css";
import ModifyClassrooms from "./ClassroomManager/ModifyClassrooms";
import CreateBranch from "./BranchesManager/CreateBranch";
import ModifyBranch from "./BranchesManager/ModifyBranch";
import CreateSubjects from "./BranchesManager/CreateSubjects";
import CreateFaculty from "./FacultiesManager/CreateFaculty";
import ModifyFaculty from "./FacultiesManager/ModifyFaculty";
import AssignSubjects from "./FacultiesManager/AssignSubjects";
import TimeTableBuilder from "./Builder/TimeTableBuilder";
import ViewTimeTables from "./Builder/ViewTimeTables";
import createInitialDirectory from "../UtilityFunctions/CreateInitialDirectory";
import readFromFile from "../UtilityFunctions/ReadFromFile";
import saveToFile from "../UtilityFunctions/SaveToFile";

function Home() {
  const [selectedScreen, setSelectedScreen] = useState(0);
  const [availableClassrooms, setAvailableClassrooms] = useState({});
  const [availableLabs, setAvailableLabs] = useState({});

  useEffect(() => {
    // Used To Create The Initial Directory If It Does Not Exist
    createInitialDirectory();
    //Functions to get data stored in files
    let getAvailableClassrooms = async () => {
      try {
        const data = await readFromFile("classrooms.txt");
        // Use the data here
        setAvailableClassrooms(data);
      } catch (error) {
        // this means text files dont exist , so create new txt files
        toast.success("Loaded New Classrooms File : <Home.js> (Ignore)");
        saveToFile({}, "classrooms");
      }
    };
    let getAvailableLabs = async () => {
      try {
        const data = await readFromFile("labs.txt");
        // Use the data here
        setAvailableLabs(data);
      } catch (error) {
        // this means text files dont exist , so create new txt files
        toast.success("Loaded New Labs File : <Home.js> (Ignore)");
        saveToFile({}, "labs");
      }
    };
    getAvailableClassrooms();
    getAvailableLabs();
  }, []);

  return (
    <div>
      <NavBar
        setSelectedScreen={setSelectedScreen}
        selectedScreen={selectedScreen}
      />
      <h1 className={styles.version}>{"< V1.0 LTS />"}</h1>
      {selectedScreen === 1 && (
        <ModifyClassrooms
          setAvailableClassrooms={setAvailableClassrooms}
          availableClassrooms={availableClassrooms}
          setAvailableLabs={setAvailableLabs}
          availableLabs={availableLabs}
        />
      )}
      {selectedScreen === 2 && <CreateBranch />}
      {selectedScreen === 3 && <ModifyBranch />}
      {selectedScreen === 4 && <CreateSubjects />}
      {selectedScreen === 5 && <CreateFaculty />}
      {selectedScreen === 6 && <ModifyFaculty />}
      {selectedScreen === 7 && <AssignSubjects />}
      {selectedScreen === 8 && <TimeTableBuilder />}
      {selectedScreen === 9 && <ViewTimeTables />}
      <Toaster />
    </div>
  );
}

export default Home;
