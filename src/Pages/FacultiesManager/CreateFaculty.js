import { useRef } from "react";
import styles from "../../Styles/CreateFaculty.module.css";
import toast from "react-hot-toast";
import saveToFile from "../../UtilityFunctions/SaveToFile";
import closeIcon from "../../Icons/X.png";
import ConfirmButton from "../../Components/ConfirmButton";

function CreateFaculty({ setFaculties, faculties }) {
  const facultyNameRef = useRef(null);
  function addFaculty() {
    //Check If Faculty Name Input Has Some Value
    if (!facultyNameRef.current.value) {
      toast.error("Please Enter Some Faculty Name");
      return;
    }
    //Check If Faculty Name Already Exists ,If Not Add It
    if (faculties[facultyNameRef.current.value.toLowerCase()]) {
      toast.error("Faculty Name Already Exists");
      return;
    } else {
      let x = { ...faculties };
      x[facultyNameRef.current.value.toLowerCase()] = {
        offDays: [],
        subjects: [],
      };
      setFaculties(x);
      saveToFile(x, "faculties");
      toast.success("Created New Faculty");
    }
  }

  function customDeleteToast(facultyName, onClick) {
    toast.custom(
      <ConfirmButton
        value={facultyName}
        onClick={() => {
          onClick(facultyName);
        }}
      />
    );
  }

  function deleteBranch(facultyName) {
    let x = { ...faculties };
    if (x[facultyName]) {
      delete x[facultyName];
      setFaculties(x);
      saveToFile(x, "faculties");
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{"< Create Faculty >"}</h1>
      <div className={styles.inputContainer}>
        <div>
          <input
            placeholder="Enter Faculty Name *"
            ref={facultyNameRef}
          ></input>
        </div>
        <div>
          <button className={styles.addAsClassButton} onClick={addFaculty}>
            Create Faculty
          </button>
        </div>
      </div>
      <div className={styles.displayContainer}>
        <div>
          <h1 className={styles.displayContainerHeader}>All Faculties</h1>
          <div className={styles.cardContainer}>
            {Object.keys(faculties).map((faculty) => (
              <div key={faculty} className={styles.facultyContainer}>
                <div>
                  <h1 className={styles.facultyName}>{faculty}</h1>
                </div>
                <img
                  onClick={() => {
                    customDeleteToast(faculty.toLowerCase(), deleteBranch);
                  }}
                  className={styles.closeIcon}
                  src={closeIcon}
                  alt="Delete Branch"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateFaculty;
