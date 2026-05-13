import { AppDataSource } from "../data-source"
import { UserEntity } from "./user.entity"

const userRepository = AppDataSource.getRepository(UserEntity)

const getAll = () => userRepository.find()

export default {
  getAll,
}
