import styles from "../../Styles/TimeTableBuilder.module.css";
import TimeTableBuilderService from "../../Components/TimeTableBuilderService";
function TimeTableBuilder({ branches }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{"< Time Table Builder >"}</h1>
      <div>
        {Object.keys(branches).map((selectedBranch) => (
          <TimeTableBuilderService
            selectedBranch={selectedBranch}
            branches={branches}
          />
        ))}
      </div>
    </div>
  );
}

export default TimeTableBuilder;
