import styles from "../Styles/TimeTableBuilderService.module.css";
import { useState } from "react";
import toast from "react-hot-toast";
import ClassRoomCollisionManager from "../Managers/ClassRoomCollisionManager";
function TimeTableBuilderService({
  selectedBranch,
  branches,
  setFinalTimeTable,
  finalTimeTable,
  usedClassrooms,
  usedFaculties,
  setUsedClassroom,
  setUsedFaculties,
  availableClassrooms,
}) {
  const [selectedSubject, setSelectedSubject] = useState(false);
  const [tableFillers, setTableFillers] = useState([
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [1, 6],
      [1, 7],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3],
      [2, 4],
      [2, 5],
      [2, 6],
      [2, 7],
    ],
    [
      [3, 0],
      [3, 1],
      [3, 2],
      [3, 3],
      [3, 4],
      [3, 5],
      [3, 6],
      [3, 7],
    ],
    [
      [4, 0],
      [4, 1],
      [4, 2],
      [4, 3],
      [4, 4],
      [4, 5],
      [4, 6],
      [4, 7],
    ],
  ]);
  const classRoomManager = new ClassRoomCollisionManager();

  //this function handles and adds the class/lab/grouped classes
  function addToTimeTableHandler(cell, dayOfTheWeek) {
    if (!selectedSubject) {
      toast.error("Please Select A Subject");
    }
    if (selectedSubject.isGrouped) {
      console.log("Grouped Class Handler Not Created");
    } else if (selectedSubject.isLab) {
      console.log("Lab Class Handler Not Created");
    } else {
      // get all free classrooms / required classrooms from the classroom manager
      let freeClassRooms = classRoomManager.getFreeClassrooms(
        usedClassrooms,
        availableClassrooms,
        cell,
        selectedSubject.requiredClass
      );
      console.log(freeClassRooms);
      if (freeClassRooms.length > 0) {
        // if any classroom is free , place classroom into cell
        placeClassroomIntoCell(freeClassRooms, cell, dayOfTheWeek);
      } else {
        toast.error("No Free Classroom At This Time");
      }
    }
  }

  function placeClassroomIntoCell(freeClassRooms, cell, dayOfTheWeek) {}

  return (
    <div>
      <h1 className={styles.branchNameHeader}>{selectedBranch}</h1>
      {branches[selectedBranch].subjects.map((subject) => (
        <button
          className={
            subject.isGrouped
              ? styles.groupedButton
              : subject.isLab
              ? styles.labButton
              : styles.subjectButton
          }
          key={subject.subjectName}
          onClick={() => {
            setSelectedSubject(subject);
          }}
        >
          {subject.subjectName} x {subject.totalHours}
        </button>
      ))}
      <table className={styles.TimeTable}>
        <thead>
          <tr>
            <td></td>
            <td>9:15 - 10:10</td>
            <td>10:15 - 11:10</td>
            <td>11:15 - 12:10</td>
            <td>12:15 - 1:10</td>
            <td>1:15 - 2:10</td>
            <td>2:15 - 3:10</td>
            <td>3:15 - 4:10</td>
            <td>4:15 - 5:10</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Monday</td>
            {tableFillers[0].map((cell) => (
              <td
                key={cell}
                onClick={() => {
                  addToTimeTableHandler(cell, "Monday");
                }}
              ></td>
            ))}
          </tr>
          <tr>
            <td>Tuesday</td>
            {tableFillers[1].map((cell) => (
              <td key={cell}></td>
            ))}
          </tr>
          <tr>
            <td>Wednesday</td>
            {tableFillers[2].map((cell) => (
              <td key={cell}></td>
            ))}
          </tr>
          <tr>
            <td>Thrusday</td>
            {tableFillers[3].map((cell) => (
              <td key={cell}></td>
            ))}
          </tr>
          <tr>
            <td>Friday</td>
            {tableFillers[4].map((cell) => (
              <td key={cell}></td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TimeTableBuilderService;
