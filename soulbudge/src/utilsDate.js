// src/utilsDate.js

export const formatarData = (data) => {
    const partes = data.split('/');
    if (partes.length !== 3) {
        throw new Error('Data no formato inválido. Use "dd/mm/yyyy".');
    }
    const [dia, mes, ano] = partes;
    return `${ano}-${mes}-${dia}`;
};
