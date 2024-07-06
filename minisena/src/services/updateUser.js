const UserModel = require("../models/User");

const updateUserAccount = async (userId, accountData) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { conta: accountData },
      { new: true } // Retorna o documento atualizado
    );

    if (!updatedUser) {
      throw new Error("Usuário não encontrado");
    }

    return updatedUser;
  } catch (error) {
    console.error("Erro ao atualizar a conta do usuário:", error);
    throw error;
  }
};

module.exports = {
  updateUserAccount
};