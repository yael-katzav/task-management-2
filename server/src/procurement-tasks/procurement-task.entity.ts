import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm"
import { TaskEntity } from "../tasks/task.entity"

@Entity("procurement_tasks")
export class ProcurementTaskEntity {
  @PrimaryColumn("uuid")
  taskId!: string

  @OneToOne(() => TaskEntity, (task) => task.procurementTask, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "taskId" })
  task!: TaskEntity

  @Column({ nullable: true })
  quote1?: string

  @Column({ nullable: true })
  quote2?: string

  @Column({ nullable: true })
  receipt?: string
}
