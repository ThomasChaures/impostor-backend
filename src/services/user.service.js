import { prisma } from "./database.service";

const userSafeSelect = {
  id: true,
  nickname: true,
  email: true,
  createdAt: true,
};

export const createUser = async (user) => {
  try {
    return await prisma.user.create({
      data: {
        nickname: user.nickname,
        email: user.email,
        hash_password: user.password, // todo: hashearla
      },
      select: userSafeSelect,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await prisma.user.delete({ where: { id } });
  } catch (error) {
    throw error;
  }
};

export const findUserByEmail = async (email) => {
  try {
    return await prisma.user.findUnique({
      where: { email },
      select: userSafeSelect,
    });
  } catch (error) {
    throw error;
  }
};

export const findUserByNickname = async (nickname) => {
  try {
    return await prisma.user.findUnique({
      where: { nickname },
      select: userSafeSelect,
    });
  } catch (error) {
    throw error;
  }
};

export const findUserById = async (id) => {
  try {
    return await prisma.user.findUnique({
      where: { id },
      select: userSafeSelect,
    });
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (data, id) => {
  try {
    return await prisma.user.update({
      where: { id },
      data: {
        nickname: data.nickname,
        email: data.email,
      },
      select: userSafeSelect,
    });
  } catch (error) {
    throw error;
  }
};
