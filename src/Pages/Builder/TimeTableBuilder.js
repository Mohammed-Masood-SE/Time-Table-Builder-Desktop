import styles from "../../Styles/TimeTableBuilder.module.css";
import TimeTableBuilderService from "../../Components/TimeTableBuilderService";
function TimeTableBuilder({
  branches,
  finalTimeTable,
  setFinalTimeTable,
  usedClassrooms,
  usedFaculties,
  setUsedClassroom,
  setUsedFaculties,
  availableClassrooms,
}) {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{"< Time Table Builder >"}</h1>
      <div>
        {Object.keys(branches).map((selectedBranch) => (
          <TimeTableBuilderService
            finalTimeTable={finalTimeTable}
            setFinalTimeTable={setFinalTimeTable}
            key={selectedBranch}
            selectedBranch={selectedBranch}
            branches={branches}
            usedClassrooms={usedClassrooms}
            usedFaculties={usedFaculties}
            setUsedClassroom={setUsedClassroom}
            setUsedFaculties={setUsedFaculties}
            availableClassrooms={availableClassrooms}
          />
        ))}
      </div>
    </div>
  );
}

export default TimeTableBuilder;
