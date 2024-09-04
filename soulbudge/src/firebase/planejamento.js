import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
  addDoc,
} from "firebase/firestore";

import { db } from "./config";

const planejamentoCol = collection(db, "planejamento");

export async function addPlanejamento(data) {
  const docRef = await addDoc(planejamentoCol, data);
  return { id: docRef.id };
}

export async function getPlanejamentos(idUsuario) {
  const filtro = query(planejamentoCol, where("idUsuario", "==", idUsuario));
  const snapshot = await getDocs(filtro);
  const planejamento = [];

  snapshot.forEach((doc) => {
    planejamento.push({ ...doc.data(), id: doc.id });
  });

  return planejamento;
}

export async function deletePlanejamento(id) {
  const planejamentoDoc = doc(planejamentoCol, id);
  await deleteDoc(planejamentoDoc);
}

export async function getplanejamento(id) {
  const planejamentoDoc = doc(planejamentoCol, id);
  const planejamento = await getDoc(planejamentoDoc);
  return { ...planejamento.data(), id: planejamento.id };
}

export async function updateplanejamento(id, data) {
  const planejamentoDoc = doc(planejamentoCol, id);
  await updateDoc(planejamentoDoc, data);
}

export async function getPlanejamentoByMes(uid, mesNome) {
  const filtro = query(
    planejamentoCol,
    where("idUsuario", "==", uid),
    where("mes", "==", mesNome)
  );
  const querySnapshot = await getDocs(filtro);

  if (querySnapshot.empty) {
    return null;
  }

  const doc = querySnapshot.docs[0];
  return { ...doc.data(), id: doc.id };
}
