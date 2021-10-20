import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  chartOptions!: {};
  Highcharts = Highcharts;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.chartOptions = {
        chart: {
            type: 'area'
        },
        title: {
            text: 'Area graph'
        },
        subtitle: {
            text: 'Source: reacode.co.za'
        },
        xAxis: {
            categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Billions'
            },
            
        },
        tooltip: {
            split: true,
            valueSuffix: ' millions'
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },
        series: this.dataService.bigChart()
    };
  }

}
