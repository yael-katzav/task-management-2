import { TaskType } from "@shared/task/task-type.enum"
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { UserEntity } from "../users/user.entity"
import { DevelopmentTaskEntity } from "../development-tasks/development-task.entity"
import { ProcurementTaskEntity } from "../procurement-tasks/procurement-task.entity"

@Entity("tasks")
export class TaskEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ type: "varchar" })
  type!: TaskType

  @Column({ default: 1 })
  status!: number

  @Column({ default: false })
  isClosed!: boolean

  @Column()
  assignedUserId!: number

  @ManyToOne(() => UserEntity, (user) => user.tasks, { eager: true })
  @JoinColumn({ name: "assignedUserId" })
  assignedUser!: UserEntity

  @CreateDateColumn()
  createdAt!: Date

  @OneToOne(
    () => DevelopmentTaskEntity,
    (developmentTask) => developmentTask.task,
    {
      cascade: true,
    }
  )
  developmentTask?: DevelopmentTaskEntity

  @OneToOne(
    () => ProcurementTaskEntity,
    (procurementTask) => procurementTask.task,
    {
      cascade: true,
    }
  )
  procurementTask?: ProcurementTaskEntity
}
