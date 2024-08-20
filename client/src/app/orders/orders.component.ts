import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { Order } from '../_models/order';
import { OrderService } from '../_services/order.service';
import { AuthService } from '../_services';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  faTrash = faTrash;
  statues = [
    { status: 'ORDERED', label: 'Ordered', color: 'rgb(101, 101, 239)', background: 'rgba(0, 0, 255, 0.125)' },
    { status: 'SHIPPED', label: 'Shipped', color: 'rgb(186, 186, 6)', background: 'rgba(255, 255, 0, 0.1)' },
    { status: 'DELIVERED', label: 'Delivered', color: 'rgb(0,128,0)', background: 'rgba(0,128,0,0.3)' },
    { status: 'CANCELLED', label: 'Cancelled', color: 'rgb(255, 99, 71)', background: 'rgba(255, 99, 71, 0.3)' },

  ];
  constructor(private orderService: OrderService,private authService: AuthService,private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.getOrders();      
  }

  getOrders() {
    this.orderService.getOrders(this.authService.uid).subscribe((orders) => {
      this.orders = orders.sort((a, b) => b.id - a.id);
    });
  }

  cancelOrder(orderId: number) {
    this.orderService.cancelOrder(orderId).subscribe((_) => {
      this.toastrService.success('Order Cancelled Successfully');
      this.getOrders();
    });
  }

  deleteOrder(orderId: number) {
    this.orderService.deleteOrder(orderId).subscribe((_) => {
      this.toastrService.success('Order Deleted Successfully');
      this.getOrders();
    });
  }

  findStatus(status: string): any {
    const orderStatus = this.statues.find((s) => s.status === status);
    return orderStatus;
  }

}
