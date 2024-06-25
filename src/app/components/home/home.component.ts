import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MatMenuModule} from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { HttpService } from '../../http.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet,MatToolbarModule,MatIconModule,RouterLink,MatButtonModule,
    MatMenuModule,MatCardModule,CanvasJSAngularChartsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  router = inject(Router);

  employeeList: any[] = [];
  chartOptions: any;
  chartBar: any;
  totalEmployee: number = 0;
  employeeSalary: number = 0;

  httpService = inject(HttpService);

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
    this.httpService.getAllEmployee().subscribe((result) => {
      this.employeeList = result;
      this.totalEmployee = this.employeeList.length;
      this.employeeSalary = this.employeeList.map((employee) => employee.salary).reduce((acc, value) => acc + value, 0);
      this.chartOptions = {
        data: [
          {
            type: 'column',
            dataPoints: [
              { label: 'Total Employees', y: this.totalEmployee }
            ],
          },
        ],
      };
      this.chartBar = {
        data: [
          {
            type: 'column',
            dataPoints: [
              { label: 'Employees Total Salary', y: this.employeeSalary }
            ],
          },
        ],
      };
    });
  }


}
