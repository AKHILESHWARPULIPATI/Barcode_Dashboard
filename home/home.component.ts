import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as echarts from 'echarts';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('revenueChartContainer', { static: false }) revenueChartContainer!: ElementRef;
  @ViewChild('orderChartContainer', { static: false }) orderChartContainer!: ElementRef;
  @ViewChild('productSalesChartContainer', { static: false }) productSalesChartContainer!: ElementRef;

  private revenueChart!: echarts.ECharts;
  private orderChart!: echarts.ECharts;
  private productSalesChart!: echarts.ECharts;
  private isChartInitialized = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.initRevenueChart();
    this.initOrderChart();
    this.initProductSalesChart();
  }

  private initRevenueChart(): void {
    if (!this.revenueChartContainer.nativeElement) return;

    const chartDom = this.revenueChartContainer.nativeElement;
    this.revenueChart = echarts.init(chartDom);

    const option: echarts.EChartsOption = {
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [1000, 1500, 2300, 2240, 2180, 1350],
          type: 'line'
        }
      ]
    };

    this.revenueChart.setOption(option);
    this.isChartInitialized = true;
    this.cdr.detectChanges();
  }

  private initOrderChart(): void {
    if (!this.orderChartContainer.nativeElement) return;

    const chartDom = this.orderChartContainer.nativeElement;
    this.orderChart = echarts.init(chartDom);

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Orders',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 120, name: 'Pending' },
            { value: 300, name: 'Sent' },
            { value: 450, name: 'Delivered' },
            { value: 80, name: 'Returned' },
            { value: 50, name: 'Defect' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    this.orderChart.setOption(option);
    this.isChartInitialized = true;
    this.cdr.detectChanges();
  }

  private initProductSalesChart(): void {
    if (!this.productSalesChartContainer.nativeElement) return;

    const chartDom = this.productSalesChartContainer.nativeElement;
    this.productSalesChart = echarts.init(chartDom);

    const option: echarts.EChartsOption = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    };

    this.productSalesChart.setOption(option);
    this.isChartInitialized = true;
    this.cdr.detectChanges();
  }

  cards = [
    { icon: 'bx bxs-user-circle', title: 'Users', value: 215, details: 'View Users',},
    { icon: 'bx bx-package', title: 'Products', value: 450, details: 'View Products' },
    { icon: 'bx bx-line-chart', title: 'Orders', value: 2132, details: 'View Orders' },
    { icon: 'bx bx-wallet', title: 'Amount', value: '$2,32,450,780.00', details: 'View Amount'   },
  ];
  
}

