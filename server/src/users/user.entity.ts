import { TaskEntity } from "../tasks/task.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @OneToMany(() => TaskEntity, (task) => task.assignedUser)
  tasks!: TaskEntity[]
}
