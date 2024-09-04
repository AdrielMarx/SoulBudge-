import {
  sendEmailVerification,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GithubAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "./config";
import toast from "react-hot-toast";

export async function cadastrarUsuario(nome, email, senha) {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, senha);

    auth.languageCode = "pt";
    await sendEmailVerification(user);

    await updateProfile(user, { displayName: nome });

    toast.success(
      `Usuário ${nome} cadastrado com sucesso. Verifique seu email.`
    );
    return user;
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    toast.error(error.message);
    throw error;
  }
}

export async function entrarGoogle() {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
}

export async function entrarGithub() {
  const provider = new GithubAuthProvider();
  await signInWithPopup(auth, provider);
}

export async function entrarFacebook() {
  const provider = new FacebookAuthProvider();
  await signInWithPopup(auth, provider);
}

export async function entrarTwitter() {
  const provider = new TwitterAuthProvider();
  await signInWithPopup(auth, provider);
}

export async function loginUsuario(email, senha) {
  try {
    await signInWithEmailAndPassword(auth, email, senha);
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const reset = document.getElementById("reset");
  if (reset) {
    reset.addEventListener("click", redefinirSenha);
  }
});

export async function redefinirSenha(event) {
  if (event) {
    event.preventDefault();
  }

  const emailInput = document.getElementById("email");
  if (emailInput) {
    const email = emailInput.value;

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success(`Email de redefinição de senha enviado para ${email}`);

      const reset = document.getElementById("reset");
      if (reset) {
        reset.disabled = true;
      }
    } catch (error) {
      toast.error("Usuário não encontrado");
      console.error("Erro ao enviar email de redefinição:", error);
    }
  } else {
    console.error("Elemento de email não encontrado.");
  }
}

export async function logout() {
  await signOut(auth);
}
