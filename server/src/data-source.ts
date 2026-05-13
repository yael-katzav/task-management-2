import "reflect-metadata"
import { DataSource } from "typeorm"
import { DevelopmentTaskEntity } from "./development-tasks/development-task.entity"
import { ProcurementTaskEntity } from "./procurement-tasks/procurement-task.entity"
import { TaskEntity } from "./tasks/task.entity"
import { UserEntity } from "./users/user.entity"

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "task-management.sqlite",
  synchronize: false,
  logging: true,
  entities: [
    UserEntity,
    TaskEntity,
    DevelopmentTaskEntity,
    ProcurementTaskEntity,
  ],
  migrations: ["src/database/migrations/*.ts"],
})
