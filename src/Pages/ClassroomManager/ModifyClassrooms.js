import { useRef, useEffect } from "react";
import styles from "../../Styles/ModifyClassrooms.module.css";
import closeIcon from "../../Icons/X.png";
import saveToFile from "../../UtilityFunctions/SaveToFile";

function ModifyClassrooms({
  availableClassrooms,
  availableLabs,
  setAvailableClassrooms,
  setAvailableLabs,
}) {
  const classNameRef = useRef(null);
  const totalSeatsRef = useRef(null);

  function addAsClassroom() {
    //Check If ClassName Input Has Some Value
    if (!classNameRef.current.value) {
      console.log("No Value");
      return;
    }
    //Check If Total Seats Input Has Some Value
    if (!totalSeatsRef.current.value) {
      console.log("Enter Seats Value");
      return;
    }
    //Check If Class Name Already Exists , in classrooms and in labs  , If Not Add It
    if (
      availableClassrooms[classNameRef.current.value] ||
      availableLabs[classNameRef.current.value]
    ) {
      console.log("Class Name Already Exists");
      return;
    } else {
      let x = { ...availableClassrooms };
      x[classNameRef.current.value] = {
        totalSeats: parseInt(totalSeatsRef.current.value),
      };
      setAvailableClassrooms(x);
      saveToFile(x, "classrooms");
    }
  }

  function addAsLab() {
    //Check If ClassName Input Has Some Value
    if (!classNameRef.current.value) {
      console.log("No Value");
      return;
    }
    //Check If Total Seats Input Has Some Value
    if (!totalSeatsRef.current.value) {
      console.log("Enter Seats Value");
      return;
    }
    //Check If Class Name Already Exists , in classrooms and in labs , If Not Add It
    if (
      availableLabs[classNameRef.current.value] ||
      availableClassrooms[classNameRef.current.value]
    ) {
      console.log("Lab Name Already Exists");
      return;
    } else {
      let x = { ...availableLabs };
      x[classNameRef.current.value] = {
        totalSeats: parseInt(totalSeatsRef.current.value),
      };
      setAvailableLabs(x);
      saveToFile(x, "labs");
    }
  }

  function deleteClassRoom(roomNumber) {
    let x = { ...availableClassrooms };
    delete x[roomNumber];
    setAvailableClassrooms(x);
    saveToFile(x, "classrooms");
  }

  function deleteLab(labName) {
    let x = { ...availableLabs };
    delete x[labName];
    setAvailableLabs(x);
    saveToFile(x, "labs");
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{"< Modify Available Classrooms >"}</h1>
      <div className={styles.inputContainer}>
        <div>
          <input
            placeholder="Enter Class Name / Lab Name *"
            ref={classNameRef}
          ></input>
          <input
            placeholder="Enter Number Of Seats *"
            type="number"
            ref={totalSeatsRef}
          ></input>
        </div>
        <div>
          <button className={styles.addAsClassButton} onClick={addAsClassroom}>
            Add As Classroom
          </button>
          <button className={styles.addAsLabButton} onClick={addAsLab}>
            Add As Lab
          </button>
        </div>
      </div>
      <div className={styles.displayContainer}>
        <div>
          <h1 className={styles.displayContainerHeader}>
            Available Classrooms
          </h1>
          <div className={styles.roomHolder}>
            {Object.keys(availableClassrooms).map((roomNumber) => (
              <div key={roomNumber} className={styles.roomContainer}>
                <div>
                  <h1 className={styles.roomNumber}>{roomNumber}</h1>
                  <h1 className={styles.totalSeats}>
                    Class Size : {availableClassrooms[roomNumber].totalSeats}
                  </h1>
                </div>
                <img
                  onClick={() => {
                    deleteClassRoom(roomNumber);
                  }}
                  className={styles.closeIcon}
                  src={closeIcon}
                  alt="Delete Classroom"
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className={styles.displayContainerHeader}>Available Labs</h1>
          <div className={styles.roomHolder}>
            {Object.keys(availableLabs).map((roomNumber) => (
              <div key={roomNumber} className={styles.roomContainer}>
                <div>
                  <h1 className={styles.roomNumber}>{roomNumber}</h1>
                  <h1 className={styles.totalSeats}>
                    Class Size : {availableLabs[roomNumber].totalSeats}
                  </h1>
                </div>
                <img
                  onClick={() => {
                    deleteLab(roomNumber);
                  }}
                  className={styles.closeIcon}
                  src={closeIcon}
                  alt="Delete Classroom"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModifyClassrooms;
