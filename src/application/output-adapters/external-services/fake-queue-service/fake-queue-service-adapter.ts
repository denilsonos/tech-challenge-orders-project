import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, DataSource } from 'typeorm'
import { Order } from '../../../../domain/entitites/order';
import { QueueServiceAdapter } from '../queue-service-adapter';
import { OrderStatus } from '../../../../domain/enums/order-status';

// no entity, this is fake queue with typeorm (the famous gambiarra)
@Entity('queue')
export class FakeQueue {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  public id?: number

  @Column({ type: 'varchar', name: 'status' })
  public status!: string

  @CreateDateColumn({ type: "datetime", name: 'createdAt' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updatedAt' })
  public updatedAt!: Date;

  @OneToOne(() => Order, (order) => order.queue)
  @JoinColumn()
  public order!: Order
}

export class FakeQueueServiceAdapter implements QueueServiceAdapter {
  constructor(private readonly database: DataSource) { }
  /**
   * Simulating the behavior of a queue: when the total number of orders received in the queue is greater than or equal to 5,
   * the oldest is updated to "in preparation" and when the total number of orders in preparation is greater than or equal to 2,
   * the oldest is updated to "ready"
   */
  async toqueue(order: Order): Promise<void> {
    const orderRepository = this.database.getRepository(Order);
    order.status = OrderStatus.Received
    await orderRepository.update(order.id!, { status: order.status });

    const queueRepository = this.database.getRepository(FakeQueue);
    const queue = new FakeQueue();
    queue.status = OrderStatus.Received;
    queue.order = order
    await queueRepository.save(queue);

    const countOrdersReceived = await queueRepository.count({
      where: { status: OrderStatus.Received }
    });

    if (countOrdersReceived >= 5) {
      const oldestReceivedOrder = await queueRepository.findOne({
        where: { status: OrderStatus.Received },
        relations: ['order'],
        order: { createdAt: 'ASC' }
      });

      if (oldestReceivedOrder) {
        await Promise.all([
          queueRepository.update(oldestReceivedOrder.id!, { status: OrderStatus.InPreparation }),
          orderRepository.update(oldestReceivedOrder.order.id!, { status: OrderStatus.InPreparation })
        ]);
      }
    }

    const countOrdersInPreparation = await queueRepository.count({
      where: { status: OrderStatus.InPreparation }
    });

    if (countOrdersInPreparation >= 2) {
      const oldestInPreparationOrder = await queueRepository.findOne({
        where: { status: OrderStatus.InPreparation },
        relations: ['order'],
        order: { createdAt: 'ASC' }
      });

      if (oldestInPreparationOrder) {
        await Promise.all([
          queueRepository.update(oldestInPreparationOrder.id!, { status: OrderStatus.Ready }),
          orderRepository.update(oldestInPreparationOrder.order.id!, { status: OrderStatus.Ready })
        ]) 
      }
    }
  }

  /**
   * An order can only receive a “finished” status update if it has a “ready” status,
   * so this function is called to remove it from the queue
   */
  async dequeue(order: Order): Promise<void> {
    const queueRepository = this.database.getRepository(FakeQueue);
    const queue = await queueRepository.findOne({
      where: { order: { id: order.id } },
    });
    await queueRepository.delete({ id: queue!.id })
  }
}