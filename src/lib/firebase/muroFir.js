import {
  collection, addDoc, getDocs, db, deleteDoc, onSnapshot, doc, getDoc, updateDoc, arrayUnion, arrayRemove
} from './metFirebase.js';

export const saveTask = (title, description, uid) => {
  const newPost = {
    likes: [],
    title,
    description,
    uid,
  };
  addDoc(collection(db, 'tasks'), newPost);
};
export const getTasks = () => getDocs(collection(db, 'tasks'));
export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'), callback);
export const deleteTask = (id) => deleteDoc(doc(db, 'tasks', id));
export const getTask = (id) => getDoc(doc(db, 'tasks', id));
export const updateTask = (id, newFields) => updateDoc(doc(db, 'tasks', id), newFields);
export const addlike = async (id) => {
  
  const taskRef = doc(db, "tasks", id);
  const docSnap = await getDoc(taskRef);
  const taskData = docSnap.data()

  if (taskData.likes.includes(id)) {
    await updateDoc(taskRef, {
      likes: arrayRemove(id)
    });
  } else {
    await updateDoc(taskRef, {
      likes: arrayUnion(id)
    });
  }
};
