import { useRef, useState } from "react";
import styles from "../../Styles/ModifyFaculty.module.css";
import toast from "react-hot-toast";
import closeIcon from "../../Icons/X.png";
import saveToFile from "../../UtilityFunctions/SaveToFile";

function ModifyFaculty({ faculties, setFaculties }) {
  const [selectedFaculty, setSelectedFaculty] = useState(false);
  const offDayRef = useRef(null);
  function onFacultyChange(e) {
    if (e.target.value === "none") {
      setSelectedFaculty(false);
    } else {
      setSelectedFaculty(e.target.value);
    }
  }

  function addOffDay() {
    if (!offDayRef.current.value || offDayRef.current.value === "none") {
      toast.error(
        "No Off Day Selected , Can Be Because No More Off Days Are Left To Assign"
      );
      return;
    }
    let temp = { ...faculties };
    if (temp[selectedFaculty].offDays.includes(offDayRef.current.value)) {
      toast.error(
        `${selectedFaculty} Is Already Off On ${offDayRef.current.value}`
      );
    } else {
      temp[selectedFaculty].offDays.push(offDayRef.current.value);
      setFaculties(temp);
      saveToFile(temp, "faculties");
      toast.success(
        `${offDayRef.current.value} Has Been Added To ${selectedFaculty}`
      );
    }
  }

  function removeOffDay(offday) {
    let temp = { ...faculties };
    let newOffDays = temp[selectedFaculty].offDays.filter((x) => x !== offday);
    temp[selectedFaculty].offDays = newOffDays;
    setFaculties(temp);
    saveToFile(temp, "faculties");
    toast.success(`${offday} Has Been Removed From ${selectedFaculty}`);
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{`< ModifyFaculty > ${
        selectedFaculty ? `< ${selectedFaculty} >` : ""
      } `}</h1>
      <div className={styles.selectorContainer}>
        <select
          defaultValue={"none"}
          className={styles.facultySelector}
          onChange={(e) => {
            onFacultyChange(e);
          }}
        >
          <option value={"none"} disabled={true}>
            Please Select A Faculty To Add/Remove Their Offdays
          </option>
          {Object.keys(faculties).map((faculty) => (
            <option key={faculty} value={faculty}>
              {faculty}
            </option>
          ))}
        </select>
      </div>
      {selectedFaculty && (
        <div>
          <div>
            <div>
              <select
                defaultValue={"none"}
                className={styles.facultySelector}
                ref={offDayRef}
              >
                <option value={"none"} disabled={true}>
                  Please Select A Day Of The Week
                </option>
                <option value={"Monday"}>Monday</option>
                <option value={"Tuesday"}>Tuesday</option>
                <option value={"Wednesday"}>Wednesday</option>
                <option value={"Thrusday"}>Thrusday</option>
                <option value={"Friday"}>Friday</option>
              </select>
            </div>
            <div>
              <button className={styles.addOffDayButton} onClick={addOffDay}>
                Add Off Day
              </button>
            </div>
          </div>
          <div>
            <table className={styles.tableOffDaysDisplay}>
              <thead>
                <tr>
                  <td>Off Days</td>
                  <td>Remove</td>
                </tr>
              </thead>
              <tbody>
                {faculties[selectedFaculty].offDays.map((offday) => (
                  <tr className={styles.offDayRow} key={offday}>
                    <td>{offday}</td>
                    <td>
                      <img
                        onClick={() => {
                          removeOffDay(offday);
                        }}
                        className={styles.deleteOffDay}
                        src={closeIcon}
                        alt="Delete Off Day"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModifyFaculty;
