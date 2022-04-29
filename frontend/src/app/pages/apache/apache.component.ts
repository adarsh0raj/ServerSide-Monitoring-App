import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

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
import { apache_metric } from 'src/app/interfaces/metrics';


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
  selector: 'app-apache',
  templateUrl: './apache.component.html',
  styleUrls: ['./apache.component.scss']
})
export class ApacheComponent implements OnInit {

  host_name : any;
  apache_data: apache_metric;

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
      categories: [10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300],
      title: {
        text: "Time (in Secs)"
      }
    },
    yaxis: {
      title: {
        text: "Value Measure"
      }
    }
  };

  constructor(private http: HttpClient , private actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.actRoute.paramMap.subscribe(params => {
      this.host_name = params.get('id');
      console.log(this.host_name)

      this.http.post<apache_metric>('http://localhost:3080/node/apache', {"field":"BytesPerSec", "bucket":"system", "host":this.host_name, "port": "80", "server": "localhost"}).subscribe(data => {
        this.apache_data = data;
        console.log(this.apache_data);

        this.chartOptions.series[0].data = this.apache_data.measure;

        console.log(this.chartOptions);

      });

    });
  }

}
