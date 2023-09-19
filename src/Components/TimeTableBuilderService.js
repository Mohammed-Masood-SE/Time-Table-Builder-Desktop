import styles from "../Styles/TimeTableBuilderService.module.css";

function TimeTableBuilderService({ selectedBranch, branches }) {
  console.log(branches[selectedBranch]);
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
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Tuesday</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Wednesday</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Thrusday</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Friday</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TimeTableBuilderService;
