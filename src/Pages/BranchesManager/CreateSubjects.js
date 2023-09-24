import { useRef, useState } from "react";
import styles from "../../Styles/CreateSubjects.module.css";
import closeIcon from "../../Icons/X.png";
import toast from "react-hot-toast";
import saveToFile from "../../UtilityFunctions/SaveToFile";
function CreateSubjects({
  branches,
  availableClassrooms,
  availableLabs,
  setBranches,
}) {
  const [selectedBranch, setSelectedBranch] = useState(false);
  const [createSubjectMenu, setCreateSubjectMenu] = useState(false);
  function onBranchChange(e) {
    if (e.target.value === "none") {
      setSelectedBranch(false);
    } else {
      setSelectedBranch(e.target.value);
    }
  }

  function deleteSubject(subjectName) {
    let tempBranches = { ...branches };
    let keys = Object.keys(branches);
    for (let i = 0; i < keys.length; i++) {
      for (let j = 0; j < branches[keys[i]].subjects.length; j++) {
        if (branches[keys[i]].subjects[j].subjectName === subjectName) {
          let newSubjects = branches[keys[i]].subjects.filter(
            (sub) => sub.subjectName !== subjectName
          );
          toast.success(`Removed ${subjectName} For ${keys[i]}`);
          tempBranches[keys[i]].subjects = newSubjects;
        }
      }
    }
    setBranches(tempBranches);
    saveToFile(tempBranches, "branches");
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{"< Create Subjects >"}</h1>
      <div className={styles.selectorContainer}>
        <select
          defaultValue={"none"}
          className={styles.branchSelector}
          onChange={(e) => {
            onBranchChange(e);
          }}
        >
          <option value={"none"} disabled={true}>
            Please Select A Branch To Add/Modify/Remove Its Subjects
          </option>
          {Object.keys(branches).map((branch) => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}
        </select>
        <div>
          <button
            className={styles.createButton}
            onClick={() => {
              if (selectedBranch) {
                setCreateSubjectMenu(true);
              }
            }}
          >
            Create New Subject
          </button>
        </div>
      </div>
      <table className={styles.tableSubjectsDisplay}>
        <thead>
          <tr>
            <td>Subject Name</td>
            <td>Total Hours Per Week</td>
            <td>Required Room</td>
            <td>Grouped With</td>
            <td>Remove</td>
          </tr>
        </thead>
        <tbody>
          {branches[selectedBranch] &&
            branches[selectedBranch].subjects.map((sub) => (
              <tr
                key={sub.subjectName}
                className={
                  sub.isLab
                    ? styles.labStyles
                    : sub.isGrouped
                    ? styles.groupStyles
                    : styles.normal
                }
              >
                <td>{sub.subjectName}</td>
                <td>{sub.totalHours}</td>
                <td>{sub.requiredClass}</td>
                <td>{sub.groupedWith.join(", ")}</td>
                <td>
                  <img
                    onClick={() => {
                      deleteSubject(sub.subjectName);
                    }}
                    className={styles.deleteGroup}
                    src={closeIcon}
                    alt="Delete Branch"
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {createSubjectMenu && (
        <PopUp
          selectedBranch={selectedBranch}
          setCreateSubjectMenu={setCreateSubjectMenu}
          availableClassrooms={availableClassrooms}
          availableLabs={availableLabs}
          branches={branches}
          setBranches={setBranches}
        />
      )}
    </div>
  );
}

const PopUp = ({
  selectedBranch,
  setCreateSubjectMenu,
  availableClassrooms,
  availableLabs,
  branches,
  setBranches,
}) => {
  const subjectNameRef = useRef(null);
  const totalHoursPerWeekRef = useRef(null);
  const [requiredRoom, setRequiredRoom] = useState("none");
  const selectedGroupedWith = useRef(null);
  const [groupedWithBranches, setGroupedWithBranches] = useState([]);

  function checkIfSubjectAlreadyExists(subjectName) {
    console.log(subjectName);
    let keys = Object.keys(branches);
    for (let i = 0; i < keys.length; i++) {
      for (let j = 0; j < branches[keys[i]].subjects.length; j++) {
        if (branches[keys[i]].subjects[j].subjectName === subjectName) {
          return true;
        }
      }
    }
    return false;
  }

  function createSubject(isLab) {
    if (!subjectNameRef.current.value) {
      toast.error("Please Enter Subject Name");
      return;
    }
    if (!totalHoursPerWeekRef.current.value) {
      toast.error("Please Enter Total Hours Per Week");
      return;
    }
    if (requiredRoom === "none") {
      toast.error("Please Select Some Required Room");
      return;
    }
    if (isLab && requiredRoom === "any") {
      toast.error("Labs Cannot Have Required Room As Any");
      return;
    }
    if (isLab && availableClassrooms[requiredRoom]) {
      toast.error("Required Room Is A Normal Classroom And Not A Lab");
      return;
    }
    if (!isLab && availableLabs[requiredRoom]) {
      toast.error(
        "Required Room Is A Lab But Your Clicked Add As Normal Classroom"
      );
      return;
    }
    if (groupedWithBranches.length > 0 && isLab) {
      toast.error("Labs Cannot Be Grouped Together");
      return;
    }

    if (checkIfSubjectAlreadyExists(subjectNameRef.current.value)) {
      toast.error(
        "Subject With The Same Name Already Exists , Can Be In Other Branches Too"
      );
      return;
    }

    let subject = {
      subjectName: subjectNameRef.current.value,
      totalHours: totalHoursPerWeekRef.current.value,
      isGrouped: groupedWithBranches.length > 0 ? true : false,
      groupedWith: groupedWithBranches,
      isLab: isLab,
      requiredClass: requiredRoom,
    };
    let tempBranches = { ...branches };
    tempBranches[selectedBranch].subjects.push(subject);
    toast.success(`Added Subject For ${selectedBranch}`);
    for (let i = 0; i < groupedWithBranches.length; i++) {
      let newGroupedWith = groupedWithBranches.filter(
        (group) => group !== groupedWithBranches[i]
      );
      let newSubject = {
        subjectName: subjectNameRef.current.value,
        totalHours: totalHoursPerWeekRef.current.value,
        isGrouped: groupedWithBranches.length > 0 ? true : false,
        groupedWith: newGroupedWith,
        isLab: isLab,
        requiredClass: requiredRoom,
      };
      newGroupedWith.push(selectedBranch);
      tempBranches[groupedWithBranches[i]].subjects.push(newSubject);
      toast.success(`Added Subject For ${groupedWithBranches[i]}`);
    }
    setBranches(tempBranches);
    saveToFile(tempBranches, "branches");
    setCreateSubjectMenu(false);
  }
  function addToGroup() {
    if (selectedGroupedWith.current.value === "none") {
      toast.error("Please Select A Branch To Group");
      return;
    } else if (
      groupedWithBranches.includes(selectedGroupedWith.current.value)
    ) {
      toast.error("Already Included In Grouped Branches");
      return;
    } else {
      let x = [...groupedWithBranches];
      x.push(selectedGroupedWith.current.value);
      setGroupedWithBranches(x);
    }
  }

  function removeGroupedBranch(branchName) {
    let x = groupedWithBranches.filter((x) => x !== branchName);
    setGroupedWithBranches(x);
  }

  return (
    <div className={styles.popUp}>
      <h1
        className={styles.header}
      >{`Create A New Subject For < ${selectedBranch} >`}</h1>
      <div className={styles.inputContainer}>
        <div className={styles.marginBottom}>
          <h1 className={styles.subText}>
            Enter Subject Name And Total Hours Required Per Week
          </h1>
          <input placeholder="Enter Subject Name*" ref={subjectNameRef}></input>
          <input
            placeholder="Enter Total Hours Per Week *"
            type="number"
            ref={totalHoursPerWeekRef}
          ></input>
        </div>
        <div className={styles.marginBottom}>
          <h1 className={styles.subText}>Select Required Room</h1>
          <select
            defaultValue={"none"}
            className={styles.branchSelector}
            onChange={(e) => {
              setRequiredRoom(e.target.value);
            }}
          >
            <option value={"none"} disabled={true}>
              Please Select A Required Classroom
            </option>
            <option value={"any"}>Any</option>
            {Object.keys(availableClassrooms).map((className) => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
            {Object.keys(availableLabs).map((labName) => (
              <option key={labName} value={labName}>
                {labName} : LAB
              </option>
            ))}
          </select>
        </div>
        <div className={styles.marginBottom}>
          <h1 className={styles.subText}>Group Branches To Subject</h1>
          <select
            defaultValue={"none"}
            className={styles.branchSelector}
            ref={selectedGroupedWith}
          >
            <option value={"none"} disabled={true}>
              Select A Branch To Group
            </option>
            {Object.keys(branches).map((branch) => {
              if (branch !== selectedBranch) {
                return (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                );
              }
            })}
          </select>
          <button className={styles.createButton} onClick={addToGroup}>
            Add To Group
          </button>
        </div>
        <div className={styles.marginBottom}>
          <table className={styles.tableGroupDisplay}>
            <thead>
              <tr>
                <td>Grouped With</td>
                <td>Remove</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedBranch}</td>
              </tr>
              {groupedWithBranches.map((branch) => (
                <tr key={branch}>
                  <td>{branch}</td>
                  <td>
                    <img
                      onClick={() => {
                        removeGroupedBranch(branch);
                      }}
                      className={styles.deleteGroup}
                      src={closeIcon}
                      alt="Delete Branch"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.marginBottom}>
          <button
            className={styles.normalClassButton}
            onClick={() => {
              createSubject(false);
            }}
          >
            Add As Normal Class
          </button>
          <button
            className={styles.labButton}
            onClick={() => {
              createSubject(true);
            }}
          >
            Add As Lab
          </button>
        </div>
      </div>

      <img
        onClick={() => {
          setCreateSubjectMenu(false);
        }}
        className={styles.closeIcon}
        src={closeIcon}
        alt="Delete Branch"
      />
    </div>
  );
};

export default CreateSubjects;
