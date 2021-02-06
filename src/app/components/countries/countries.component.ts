import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/gloabl-data';
import { DateWiseData } from 'src/app/models/date-wise-data';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  p: number = 1;
  displayedColumns: string[] = ['sno','date', 'cases'];
  data : GlobalDataSummary[];
  countries : string[] = [];
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  selectedCountryData : DateWiseData[]; 
  dateWiseData ;
  loading = true;
  datatable = [];

  chart = {
    LineChart : "LineChart", 
    height: 292, 
    options: {
      animation:{
        duration: 1000,
        easing: 'out',
      },
      is3D: true
    }  
  }
 
  constructor(private dataService : DataServiceService) { }

  ngOnInit(): void {
    merge(
      this.dataService.getDateWiseData().pipe(
        map(result=>{
          this.dateWiseData = result;
        })
      ), 
      this.dataService.getGlobalData().pipe(map(result=>{
        this.data = result;
        this.data.forEach(cs=>{
          this.countries.push(cs.country)
        })
      }))
    ).subscribe(
      {
        complete : ()=>{
         this.updateValues('India')
         this.loading = false;
        }
      }
    )
  }

  updateChart(){
    this.datatable = [];
    this.selectedCountryData.forEach(cs=>{
      this.datatable.push([cs.date , cs.cases])
    })
  }

  updateValues(country : string){
    console.log(country);
    this.data.forEach(cs=>{
      if(cs.country == country){
        this.totalActive = cs.active
        this.totalDeaths = cs.deaths
        this.totalRecovered = cs.recovered
        this.totalConfirmed = cs.confirmed
      }
    })

    this.selectedCountryData  = this.dateWiseData[country]
    this.updateChart();
    
  }
loadData(){
  this.dataService.getDateWiseData().pipe(
    map(result=>{
      this.dateWiseData = result;
    })
  )
}


}
