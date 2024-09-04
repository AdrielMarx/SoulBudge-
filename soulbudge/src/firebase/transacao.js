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

const transacaoCol = collection(db, "transacao");

export async function adicionarTransacao(data) {
  if (data.data instanceof Date) {
    data.data = data.data.toISOString().split("T")[0];
  }
  await addDoc(transacaoCol, data);
}

export async function listarTransacoes(idUsuario, mes, ano) {
  let filtro = query(transacaoCol, where("idUsuario", "==", idUsuario));

  if (mes && ano) {
    const primeiroDia = `${ano}-${String(mes).padStart(2, "0")}-01`;
    const ultimoDia = `${ano}-${String(mes).padStart(2, "0")}-31`;

    filtro = query(
      transacaoCol,
      where("idUsuario", "==", idUsuario),
      where("data", ">=", primeiroDia),
      where("data", "<=", ultimoDia)
    );
  }

  const snapshot = await getDocs(filtro);
  const transacoes = [];

  snapshot.forEach((doc) => {
    transacoes.push({ ...doc.data(), id: doc.id });
  });

  return transacoes;
}

export async function getTransacoesUsuario(idUsuario) {
  const filtro = query(transacaoCol, where("idUsuario", "==", idUsuario));
  const snapshot = await getDocs(filtro);
  const transacao = [];

  snapshot.forEach((doc) => {
    transacao.push({ ...doc.data(), id: doc.id });
  });

  return transacao;
}

export async function deletarTransacao(id) {
  const transacaoDoc = doc(transacaoCol, id);
  await deleteDoc(transacaoDoc);
}

export async function getTransacao(id) {
  const transacaoDoc = doc(transacaoCol, id);
  const transacao = await getDoc(transacaoDoc);
  return transacao.data();
}

export async function updateTransacao(id, data) {
  const transacaoDoc = doc(transacaoCol, id);
  await updateDoc(transacaoDoc, data);
}
