class ClassRoomCollisionManager {
  // cell is the cell block required [0,1]
  getFreeClassrooms(state, allClassrooms, cell, requiredClassroom) {
    let freeClassrooms = [];
    let usedClassrooms = state[cell[0]][cell[1]];
    let keys = Object.keys(allClassrooms);

    for (let i = 0; i < keys.length; i++) {
      if (!usedClassrooms.includes(keys[i])) {
        freeClassrooms.push(keys[i]);
      }
    }

    if (requiredClassroom === "any") {
      return freeClassrooms;
    } else {
      if (freeClassrooms.includes(requiredClassroom)) {
        return [requiredClassroom];
      } else {
        return false;
      }
    }
  }
}

export default ClassRoomCollisionManager;
