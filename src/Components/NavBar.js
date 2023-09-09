import styles from "../Styles/NavBar.module.css";
import burgerMenu from "../Icons/BurgerMenu.png";
import backIcon from "../Icons/Back.png";
import { useState } from "react";

function NavBar({ setSelectedScreen, selectedScreen }) {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

  const updateSelectedScreen = (screenNumber) => {
    setSelectedScreen(screenNumber);
    setIsNavMenuOpen(!isNavMenuOpen);
  };

  function selectableNavLinks(text, selectedNumber) {
    return (
      <h3
        className={
          selectedScreen === selectedNumber ? styles.selectedScreen : ""
        }
        onClick={() => {
          updateSelectedScreen(selectedNumber);
        }}
      >
        {text}
      </h3>
    );
  }

  return (
    <div className={styles.container}>
      <div
        className={`${styles.navContainer} ${
          isNavMenuOpen ? styles.showNav : ""
        }`}
      >
        <img
          onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
          className={styles.backIcon}
          src={backIcon}
          alt="Close Navigation"
        />
        <div className={styles.navItems}>
          <h1>Classroom Manager</h1>
          {selectableNavLinks("Modify Available Classrooms", 1)}
        </div>
        <div className={styles.navItems}>
          <h1>Branches Manager</h1>
          {selectableNavLinks("Create New Branch", 2)}
          {selectableNavLinks("Modify Existing Branchs", 3)}
          {selectableNavLinks("Create Subjects For Branch", 4)}
        </div>
        <div className={styles.navItems}>
          <h1>Faculties Manager</h1>
          {selectableNavLinks("Create New Faculty", 5)}
          {selectableNavLinks("Modify Existing Faculties", 6)}
          {selectableNavLinks("Assign Subjects To Faculty", 7)}
        </div>
        <div className={styles.navItems}>
          <h1>Builder</h1>
          {selectableNavLinks("Time Table Builder </>", 8)}
          {selectableNavLinks("View Time Tables", 9)}
        </div>
        <div className={styles.navItems}>
          <h1>Extras</h1>
          <h3>Load Data (JSON)</h3>
          <h3>Import Data (Excel) </h3>
          <h3>Export Data (Excel)</h3>
        </div>
      </div>

      {!isNavMenuOpen && (
        <img
          onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
          className={styles.burgerMenu}
          src={burgerMenu}
          alt="Burger Menu"
        />
      )}
    </div>
  );
}

export default NavBar;
