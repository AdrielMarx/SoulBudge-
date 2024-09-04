import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "./config";

const despesaCol = collection(db, "despesa");

export async function adicionarDespesa(data) {
  if (data.data instanceof Date) {
    data.data = data.data.toISOString().split("T")[0];
  }
  await addDoc(despesaCol, data);
}
export async function listarDespesas(idUsuario, mes, ano) {
  let filtro = query(despesaCol, where("idUsuario", "==", idUsuario));

  if (mes && ano) {
    const primeiroDia = `${ano}-${String(mes).padStart(2, "0")}-01`;
    const ultimoDia = `${ano}-${String(mes).padStart(2, "0")}-31`;

    filtro = query(
      despesaCol,
      where("idUsuario", "==", idUsuario),
      where("data", ">=", primeiroDia),
      where("data", "<=", ultimoDia)
    );
  }

  const snapshot = await getDocs(filtro);
  const despesas = [];

  snapshot.forEach((doc) => {
    despesas.push({ ...doc.data(), id: doc.id });
  });

  return despesas;
}

export async function getDespesasUsuario(idUsuario) {
  const filtro = query(despesaCol, where("idUsuario", "==", idUsuario));
  const snapshot = await getDocs(filtro);
  const despesa = [];

  snapshot.forEach((doc) => {
    despesa.push({ ...doc.data(), id: doc.id });
  });

  return despesa;
}

export async function marcarComoPaga(id) {
  const despesaDoc = doc(despesaCol, id);
  try {
    await updateDoc(despesaDoc, { paga: true });
  } catch (error) {
    console.error("Erro ao marcar despesa como paga:", error);
    throw error;
  }
}

export async function atualizarStatusDespesa(id, novoStatus) {
  const despesaDoc = doc(despesaCol, id);
  try {
    await updateDoc(despesaDoc, { paga: novoStatus });
  } catch (error) {
    console.error("Erro ao atualizar status da despesa:", error);
    throw error;
  }
}

export async function deletarDespesa(id) {
  const despesaDoc = doc(despesaCol, id);
  await deleteDoc(despesaDoc);
}

export async function getDespesa(id) {
  const despesaDoc = doc(despesaCol, id);
  const despesa = await getDoc(despesaDoc);
  return despesa.data();
}

export async function updateDespesa(id, data) {
  const despesaDoc = doc(despesaCol, id);
  await updateDoc(despesaDoc, data);
}
