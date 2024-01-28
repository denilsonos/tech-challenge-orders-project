import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import { Order } from '../../../src-old/domain/entitites/order'
import { PaymentStatus } from '../../core/entities/enums/payment-status'

type PaymentProps = {
  order: Order
  qrCodeImage: string
}

@Entity('payment')
export class PaymentDAO {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  public id?: number

  @Column({ type: 'longblob', name: 'qrCode' })
  public qrCode!: Buffer

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'value',
    default: 0,
  })
  public value!: number

  @Column({ type: 'varchar', name: 'status' })
  public status!: string

  @CreateDateColumn({ type: 'datetime', name: 'createdAt' })
  public createdAt!: Date

  @UpdateDateColumn({ type: 'datetime', name: 'updatedAt' })
  public updatedAt!: Date

  @OneToOne(() => Order, (order: any) => order.payment)
  @JoinColumn()
  public order?: Order

  public daoToEntity(props: PaymentProps): void {
    this.qrCode = this.transformQRCodeToBuffer(props.qrCodeImage)
    this.value = props.order.total
    this.status = PaymentStatus.Pending
    this.order = props.order
  }

  private transformQRCodeToBuffer(data: string): Buffer {
    const base64 = data.split(',')[1]
    return Buffer.from(base64, 'base64')
  }

  private transformBufferToQRCodeData(buffer: Buffer): string {
    return `data:image/png;base64,${buffer.toString('base64')}`
  }
}
