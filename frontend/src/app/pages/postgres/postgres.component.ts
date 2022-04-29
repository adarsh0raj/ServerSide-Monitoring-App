import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { postgres_metric } from 'src/app/interfaces/metrics';

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
  selector: 'app-postgres',
  templateUrl: './postgres.component.html',
  styleUrls: ['./postgres.component.scss']
})
export class PostgresComponent implements OnInit {

  host_name : any;
  postgres_data : postgres_metric;
  p : Boolean =  false;

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

      this.http.post<postgres_metric>('http://localhost:3080/node/postgres', {"field":"blks_hit", "bucket":"system", "host":this.host_name, "db": "lab3db", "threshold":"-1"}).subscribe(data => {
        this.postgres_data = data;
        console.log(this.postgres_data);

        this.chartOptions.series[0].data = this.postgres_data.measure;
        if(this.postgres_data.alerts.length > 0) {
          this.p = true;
        }

        console.log(this.chartOptions);

      });
    });
  }

}
