import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cpu_metric, mem_metric, net_metric } from '../../interfaces/metrics';
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
  net_metrics_bytes_sent : net_metric;
  net_metrics_bytes_recv : net_metric;

  host_name : any;
  interface : string = "";

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
      categories: [10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300],
      title: {
        text: "Time (in Secs)"
      }
    },
    yaxis: {
      title: {
        text: "Value"
      }
    }
  };

  public chartOptions3: ChartOptions = {
    series: [
      {
        name: "bytes_sent",
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
      text: "Network Info (Bytes Sent)",
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
        text: "Values"
      }
    }
  };

  public chartOptions4: ChartOptions = {
    series: [
      {
        name: "bytes_recv",
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
      text: "Network Info (Bytes Received)",
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
        text: "Values"
      }
    }
  };

  constructor(private http: HttpClient , private actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.actRoute.paramMap.subscribe(params => {
      this.host_name = params.get('id');
      console.log(this.host_name);

      if(this.host_name == "ad-lap" || this.host_name == "raspberrypi"){
        this.interface = "wlo1";
      }
      else if(this.host_name == "DESKTOP-5O3H11B"){
        this.interface = "Wi-Fi";
      }
      else if(this.host_name == "Sambits-MacBook-Pro.local"){
        this.interface = "en0";
      }


      this.http.post<cpu_metric>('http://localhost:3080/node/cpu', {"field":"usage_system", "cpu_no":"cpu-total", "bucket":"system", "host":this.host_name}).subscribe(data => {
        this.cpu_metrics = data;

        this.chartOptions.series[0].data = this.cpu_metrics.measure;
        // this.chartOptions.xaxis.categories = this.cpu_metrics.time.forEach(x => x.slice(11,19).toString());
      });

      this.http.post<mem_metric>('http://localhost:3080/node/mem', {"field":"active","bucket":"system", "host":this.host_name}).subscribe(data => {
        this.mem_metrics = data;

        this.chartOptions2.series[0].data = this.mem_metrics.measure;
        // this.chartOptions2.xaxis.categories = this.mem_metrics.time.map(x => x.slice(11,19).toString());

      });

      this.http.post<net_metric>('http://localhost:3080/node/net', {"field":"bytes_sent","bucket":"system", "host":this.host_name, "inter_face":this.interface}).subscribe(data => {
        this.net_metrics_bytes_sent = data;

        this.http.post<net_metric>('http://localhost:3080/node/net', {"field":"bytes_recv","bucket":"system", "host":this.host_name, "inter_face":this.interface}).subscribe(data => {
          this.net_metrics_bytes_recv = data;

          this.chartOptions3.series[0].data = this.net_metrics_bytes_sent.measure;
         
          this.chartOptions4.series[0].data = this.net_metrics_bytes_recv.measure;

          // this.chartOptions3.xaxis.categories = this.net_metrics_bytes_sent.time.map(x => x.slice(11,19).toString());
          // this.chartOptions4.xaxis.categories = this.net_metrics_bytes_recv.time.map(x => x.slice(11,19).toString());
        });
      });

    });

    

  }

}
