import { useState, useEffect, useRef } from "react";
import styles from "../../Styles/AssignSubjects.module.css";
import toast from "react-hot-toast";
import closeIcon from "../../Icons/X.png";
import saveToFile from "../../UtilityFunctions/SaveToFile";

function AssignSubjects({ faculties, setFaculties, branches }) {
  const [selectedFaculty, setSelectedFaculty] = useState(false);
  //Unique subjects are which that have not yet been picked by any other faculties
  const [allUniqueSubjects, setAllUniqueSubjects] = useState([]);
  const subjectInputRef = useRef(null);
  function onFacultyChange(e) {
    if (e.target.value === "none") {
      setSelectedFaculty(false);
    } else {
      setSelectedFaculty(e.target.value);
    }
  }

  function getAllUniqueBranchSubjects() {
    let tempSubjects = [];
    let branchNames = Object.keys(branches);
    // filter out subjects that are already in allSubjects
    for (let branchName of branchNames) {
      let branchSubjects = branches[branchName].subjects;
      for (let i = 0; i < branchSubjects.length; i++) {
        if (!tempSubjects.includes(branchSubjects[i].subjectName)) {
          tempSubjects.push(branchSubjects[i].subjectName);
        }
      }
    }
    //filter out unique subjects that no other faculty is teaching
    let facultyNames = Object.keys(faculties);
    for (let facultyName of facultyNames) {
      let facultySubjects = faculties[facultyName].subjects;
      // filter out subjects that are already in allSubjects
      for (let i = 0; i < facultySubjects.length; i++) {
        if (tempSubjects.includes(facultySubjects[i])) {
          tempSubjects = tempSubjects.filter(
            (subName) => subName !== facultySubjects[i]
          );
        }
      }
    }
    setAllUniqueSubjects(tempSubjects);
  }

  function addSubjectToFaculty() {
    if (
      !subjectInputRef.current.value ||
      subjectInputRef.current.value === "none"
    ) {
      toast.error(
        "No Subject Selected , Can Be Because No More Subjects Are Left To Assign"
      );
      return;
    }
    let tempFaculties = { ...faculties };
    tempFaculties[selectedFaculty].subjects.push(subjectInputRef.current.value);
    setFaculties(tempFaculties);
    toast.success(
      `Added Subject ${subjectInputRef.current.value} To Faculty ${selectedFaculty}`
    );
    saveToFile(tempFaculties, "faculties");
  }

  function removeSubject(subject) {
    let tempFaculties = { ...faculties };
    // remove the clicked on subject from the faculty
    tempFaculties[selectedFaculty].subjects = tempFaculties[
      selectedFaculty
    ].subjects.filter((subName) => subName !== subject);
    setFaculties(tempFaculties);
    saveToFile(tempFaculties, "faculties");
  }
  //THERE IS A WARNING HERE FYI , FUNCTION NEEDS TO BE DEPENDANCY
  useEffect(() => {
    getAllUniqueBranchSubjects();
  }, [faculties]);
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{`< Assign Subject > ${
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
            Please Select A Faculty To Modify Their Subjects
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
          <div className={styles.selectorContainer}>
            <select
              defaultValue={"none"}
              className={styles.facultySelector}
              ref={subjectInputRef}
            >
              <option value={"none"} disabled={true}>
                Select A Subject
              </option>
              {allUniqueSubjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            <button
              className={styles.addSubjectButton}
              onClick={addSubjectToFaculty}
            >
              Add Subject
            </button>
          </div>
          <table className={styles.tableSubjectsDisplay}>
            <thead>
              <tr>
                <td>Subject Name</td>
                <td>Remove</td>
              </tr>
            </thead>
            <tbody>
              {faculties[selectedFaculty].subjects.map((subject) => (
                <tr className={styles.subjectsRow} key={subject}>
                  <td>{subject}</td>
                  <td>
                    <img
                      onClick={() => {
                        removeSubject(subject);
                      }}
                      className={styles.deleteSubject}
                      src={closeIcon}
                      alt="Delete Subject"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AssignSubjects;
