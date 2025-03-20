// angular import
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import tableData from 'src/fake-data/default-data.json';

// icons
import { IconService, IconDirective } from '@ant-design/icons-angular';
import { FallOutline, GiftOutline, MessageOutline, RiseOutline, SettingOutline } from '@ant-design/icons-angular/icons';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { showNotification } from 'src/app/demo/utils/notification';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService';

@Component({
  selector: 'app-default',
  imports: [
    CommonModule,
    CardComponent,
    IconDirective,
  ],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent {
  private iconService = inject(IconService);

  constructor(private authService: AuthService, private router:Router) {
    this.iconService.addIcon(...[RiseOutline, FallOutline, SettingOutline, GiftOutline, MessageOutline]);
  }

  stats: any = {};
  ngOnInit() {
    const token = localStorage.getItem('tubenotes_token');
    if (!token) {
      this.router.navigate(['/login']); // Redirect to login if token is missing
    }
    // this.getDashboard();
  }
  
  getDashboard() {
    this.authService.getDashboard().subscribe({
      next: (data) => {
        this.stats = data;
        console.log(data)
      },
      error: (err) => {
        console.error('Error fetching prospects:', err);
      }
    });
  }

  recentOrder = tableData;

  AnalyticEcommerce = [
    {
      title: 'Total Page Views',
      amount: '4,42,236',
      background: 'bg-light-primary ',
      border: 'border-primary',
      icon: 'rise',
      percentage: '59.3%',
      color: 'text-primary',
      number: '35,000'
    },
    {
      title: 'Total Users',
      amount: '78,250',
      background: 'bg-light-primary ',
      border: 'border-primary',
      icon: 'rise',
      percentage: '70.5%',
      color: 'text-primary',
      number: '8,900'
    },
    {
      title: 'Total Order',
      amount: '18,800',
      background: 'bg-light-warning ',
      border: 'border-warning',
      icon: 'fall',
      percentage: '27.4%',
      color: 'text-warning',
      number: '1,943'
    },
  ];

  transaction = [
    {
      background: 'text-success bg-light-success',
      icon: 'gift',
      title: 'Order #002434',
      time: 'Today, 2:00 AM',
      amount: '+ $1,430',
      percentage: '78%'
    },
    {
      background: 'text-primary bg-light-primary',
      icon: 'message',
      title: 'Order #984947',
      time: '5 August, 1:45 PM',
      amount: '- $302',
      percentage: '8%'
    },
    {
      background: 'text-danger bg-light-danger',
      icon: 'setting',
      title: 'Order #988784',
      time: '7 hours ago',
      amount: '- $682',
      percentage: '16%'
    }
  ];
}
