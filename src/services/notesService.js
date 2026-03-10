const localStorageKey="notesdata";

export const getNotes = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const notes = JSON.parse(localStorage.getItem(localStorageKey)) || [];
      resolve(notes);
    }, 300);
  });
};

export const saveNotes = (notes) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem(localStorageKey, JSON.stringify(notes));
      resolve();
    }, 300);
  });
};