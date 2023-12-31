import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import NavBar from "../Components/NavBar";
import styles from "../Styles/Home.module.css";
import ModifyClassrooms from "./ClassroomManager/ModifyClassrooms";
import CreateBranch from "./BranchesManager/CreateBranch";
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
  const [selectedScreen, setSelectedScreen] = useState(1);
  const [availableClassrooms, setAvailableClassrooms] = useState({});
  const [availableLabs, setAvailableLabs] = useState({});
  const [branches, setBranches] = useState({});
  const [faculties, setFaculties] = useState({});
  const [finalTimeTable, setFinalTimeTable] = useState({});
  const [usedClassrooms, setUsedClassroom] = useState(false);
  const [usedFaculties, setUsedFaculties] = useState(false);

  // LOADING TXT FILES INTO STATE
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
    let getBranches = async () => {
      try {
        const data = await readFromFile("branches.txt");
        // Use the data here
        setBranches(data);
      } catch (error) {
        // this means text files dont exist , so create new txt files
        toast.success("Loaded New Branches : <Home.js> (Ignore)");
        saveToFile({}, "branches");
      }
    };
    let getFaculties = async () => {
      try {
        const data = await readFromFile("faculties.txt");
        // Use the data here
        setFaculties(data);
      } catch (error) {
        // this means text files dont exist , so create new txt files
        toast.success("Loaded New Faculties : <Home.js> (Ignore)");
        saveToFile({}, "faculties");
      }
    };
    let getUsedFaculties = async () => {
      try {
        const data = await readFromFile("usedfaculties.txt");
        // Use the data here
        setUsedFaculties(data);
      } catch (error) {
        // this means text files dont exist , so create new txt files
        toast.success("Loaded New Used Faculties : <Home.js> (Ignore)");
        let temp = [
          [[], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], []],
        ];
        saveToFile(temp, "usedfaculties");
      }
    };
    let getUsedClassRooms = async () => {
      try {
        const data = await readFromFile("usedclassrooms.txt");
        // Use the data here
        setUsedClassroom(data);
      } catch (error) {
        // this means text files dont exist , so create new txt files
        toast.success("Loaded New Used Used Classrooms : <Home.js> (Ignore)");
        let temp = [
          [[], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], []],
          [[], [], [], [], [], [], [], []],
        ];
        saveToFile(temp, "usedclassrooms");
      }
    };
    let getFinalTimeTable = async () => {
      try {
        const data = await readFromFile("finalTimeTable.txt");
        // Use the data here
        setFinalTimeTable(data);
      } catch (error) {
        // this means text files dont exist , so create new txt files
        toast.success("Loaded New Final Time Table : <Home.js> (Ignore)");
        let temp = {};
        try {
          const data = await readFromFile("branches.txt");
          Object.keys(data).map((key) => {
            temp[key] = {
              Monday: [],
              Tuesday: [],
              Wednesday: [],
              Thrusday: [],
              Friday: [],
            };
          });
        } catch (error) {
          toast.error("Couldnt Find Exisiting Branches");
        }

        saveToFile(temp, "finalTimeTable");
      }
    };
    getAvailableClassrooms();
    getAvailableLabs();
    getBranches();
    getFaculties();
    getUsedFaculties();
    getUsedClassRooms();
    getFinalTimeTable();
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
      {selectedScreen === 2 && (
        <CreateBranch setBranches={setBranches} branches={branches} />
      )}
      {selectedScreen === 3 && (
        <CreateSubjects
          branches={branches}
          availableClassrooms={availableClassrooms}
          availableLabs={availableLabs}
          setBranches={setBranches}
        />
      )}
      {selectedScreen === 4 && (
        <CreateFaculty faculties={faculties} setFaculties={setFaculties} />
      )}
      {selectedScreen === 5 && (
        <ModifyFaculty faculties={faculties} setFaculties={setFaculties} />
      )}
      {selectedScreen === 6 && (
        <AssignSubjects
          faculties={faculties}
          setFaculties={setFaculties}
          branches={branches}
        />
      )}
      {selectedScreen === 7 && (
        <TimeTableBuilder
          branches={branches}
          finalTimeTable={finalTimeTable}
          setFinalTimeTable={setFinalTimeTable}
          usedClassrooms={usedClassrooms}
          usedFaculties={usedFaculties}
          setUsedClassroom={setUsedClassroom}
          setUsedFaculties={setUsedFaculties}
          availableClassrooms={availableClassrooms}
        />
      )}
      {selectedScreen === 8 && <ViewTimeTables />}
      <Toaster />
    </div>
  );
}

export default Home;
