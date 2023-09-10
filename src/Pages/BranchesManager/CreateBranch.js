import { useRef } from "react";
import toast from "react-hot-toast";
import styles from "../../Styles/CreateBranch.module.css";
import saveToFile from "../../UtilityFunctions/SaveToFile";
import closeIcon from "../../Icons/X.png";
import ConfirmButton from "../../Components/ConfirmButton";

function CreateBranch({ setBranches, branches }) {
  const branchNameRef = useRef(null);
  const totalStudents = useRef(null);

  function addBranch() {
    //Check If Branch Name Input Has Some Value
    if (!branchNameRef.current.value) {
      toast.error("Please Enter Some Branch Name");
      return;
    }
    //Check If Total Students Input Has Some Value
    if (!totalStudents.current.value) {
      toast.error("Please Enter Total Students For That Branch ");
      return;
    }
    if (totalStudents.current.value > 35) {
      toast.error("Branch With Total Students Over 35 Are Not Allowed");
      return;
    }
    //Check If Branch Name Already Exists ,If Not Add It
    if (branches[branchNameRef.current.value.toLowerCase()]) {
      toast.error("Branch Name Already Exists");
      return;
    } else {
      let x = { ...branches };
      x[branchNameRef.current.value.toLowerCase()] = {
        totalStudents: parseInt(totalStudents.current.value),
        subjects: [],
      };
      setBranches(x);
      saveToFile(x, "branches");
      toast.success("Created New Branch");
    }
  }

  function customDeleteToast(branchName, onClick) {
    toast.custom(
      <ConfirmButton
        value={branchName}
        onClick={() => {
          onClick(branchName);
        }}
      />
    );
  }

  function deleteBranch(branchName) {
    let x = { ...branches };
    if (x[branchName]) {
      delete x[branchName];
      setBranches(x);
      saveToFile(x, "branches");
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{"< Create Branchs >"}</h1>
      <div className={styles.inputContainer}>
        <div>
          <input placeholder="Enter Branch Name *" ref={branchNameRef}></input>
          <input
            placeholder="Total Students *"
            type="number"
            ref={totalStudents}
          ></input>
        </div>
        <div>
          <button className={styles.addAsClassButton} onClick={addBranch}>
            Create Branch
          </button>
        </div>
      </div>

      <div className={styles.displayContainer}>
        <div>
          <h1 className={styles.displayContainerHeader}>All Branches</h1>
          <div className={styles.cardContainer}>
            {Object.keys(branches).map((branchName) => (
              <div key={branchName} className={styles.branchContainer}>
                <div>
                  <h1 className={styles.branchName}>{branchName}</h1>
                  <h1 className={styles.totalStudents}>
                    Class Size : {branches[branchName].totalStudents}
                  </h1>
                </div>
                <img
                  onClick={() => {
                    customDeleteToast(branchName.toLowerCase(), deleteBranch);
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

export default CreateBranch;
