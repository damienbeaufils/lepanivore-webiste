import { OrderInterface } from '../domain/order/order.interface';
import { OrderRepository } from '../domain/order/order.repository';
import { InvalidUserError } from '../domain/user/errors/invalid-user.error';
import { isAdmin, User } from '../domain/user/user';

export class GetLastOrders {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(user: User, numberOfOrders: number): Promise<OrderInterface[]> {
    if (!isAdmin(user)) {
      return Promise.reject(new InvalidUserError('User has to be ADMIN to execute this action'));
    }

    return this.orderRepository.findTopByOrderByIdDesc(numberOfOrders);
  }
}
