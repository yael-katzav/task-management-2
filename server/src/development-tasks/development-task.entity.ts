import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm"
import { TaskEntity } from "../tasks/task.entity"

@Entity("development_tasks")
export class DevelopmentTaskEntity {
  @PrimaryColumn("uuid")
  taskId!: string

  @OneToOne(() => TaskEntity, (task) => task.developmentTask, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "taskId" })
  task!: TaskEntity

  @Column({ nullable: true })
  specification?: string

  @Column({ nullable: true })
  branchName?: string

  @Column({ nullable: true })
  version?: string
}
