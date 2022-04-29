import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cpu_metric, mem_metric } from '../../interfaces/metrics';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {

  cpu_metrics : cpu_metric;
  mem_metrics : mem_metric;

  public chartOptions: ChartOptions = {
    series: [
      {
        name: "",
        data: []
      }
    ],
    chart: {
      height: 400,
      type: "line",
      width: "80%",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth"
    },
    title: {
      text: "CPU Usage",
      align: "left"
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5
      }
    },
    xaxis: {
      categories: [],
      title: {
        text: "Time"
      }
    },
    yaxis: {
      title: {
        text: "Value Measure"
      }
    }
  };

  public chartOptions2: ChartOptions = {
    series: [
      {
        name: "",
        data: []
      }
    ],
    chart: {
      height: 400,
      type: "line",
      width: "80%",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth"
    },
    title: {
      text: "Mem Usage",
      align: "left"
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5
      }
    },
    xaxis: {
      categories: [],
      title: {
        text: "Time"
      }
    },
    yaxis: {
      title: {
        text: "Value"
      }
    }
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.post<cpu_metric>('http://localhost:3080/node/cpu', {"field":"usage_system", "cpu_no":"cpu-total", "host":"system"}).subscribe(data => {
      this.cpu_metrics = data;

      this.chartOptions.series[0].data = this.cpu_metrics.measure.slice(-10,-1);
      this.chartOptions.xaxis.categories = this.cpu_metrics.time.slice(-10,-1).map(x => x.slice(11,19).toString());

      console.log(this.cpu_metrics);
    });

    this.http.post<mem_metric>('http://localhost:3080/node/mem', {"field":"active", "host":"system"}).subscribe(data => {
      this.mem_metrics = data;

      this.chartOptions2.series[0].data = this.mem_metrics.measure.slice(-10,-1);
      this.chartOptions2.xaxis.categories = this.mem_metrics.time.slice(-10,-1).map(x => x.slice(11,19).toString());

      console.log(this.mem_metrics);
    });

  }

}
