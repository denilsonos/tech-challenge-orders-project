import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm'
import { Order, OrderEntity } from './order'
import { PaymentStatus } from '../enums/payment-status'

type PaymentProps = {
  order: Order
  qrCodeImage: string
}

type PaymentEntity = {
  paymentId: number,
  status: string,
  value: number | string,
  qrCode: string,
  order: OrderEntity,
  createdAt: Date,
  updatedAt: Date,
}

@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  public id?: number

  @Column({ type: 'longblob', name: 'qrCode' })
  public qrCode!: Buffer

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'value', default: 0 })
  public value!: number

  @Column({ type: 'varchar', name: 'status' })
  public status!: string

  @CreateDateColumn({ type: "datetime", name: 'createdAt' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updatedAt' })
  public updatedAt!: Date;

  @OneToOne(() => Order, (order) => order.payment)
  @JoinColumn()
  public order?: Order

  constructor() { }

  public toEntity(props: PaymentProps): void {
    this.qrCode = this.transformQRCodeToBuffer(props.qrCodeImage)
    this.value = props.order.total
    this.status = PaymentStatus.Pending
    this.order = props.order
  }

  public fromEntity(): PaymentEntity {
    return {
      paymentId: this.id!,
      status: this.status,
      value: this.value,
      qrCode: this.transformBufferToQRCodeData(this.qrCode),
      order: this.order!.fromEntity(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  private transformQRCodeToBuffer(data: string): Buffer {
    const base64 = data.split(',')[1]
    return Buffer.from(base64, 'base64')
  }

  private transformBufferToQRCodeData(buffer: Buffer): string {
    return `data:image/png;base64,${buffer.toString('base64')}`
  }
}
