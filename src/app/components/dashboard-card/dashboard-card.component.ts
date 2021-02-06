import { Component, OnInit, Input } from '@angular/core';
import * as $ from "jquery";
declare var jQuery: any;


@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent implements OnInit {

  @Input('totalConfirmed')
  totalConfirmed;
  @Input('totalDeaths')
  totalDeaths;
  @Input('totalActive')
  totalActive;
  @Input('totalRecovered')
  totalRecovered;
  counterUp: JQuery<HTMLElement>

  constructor() { }

  ngOnInit(): void {
    // $('.value').counterUp({
    //   delay: 10,
    //   time: 2000
    // });
    // (function ($) {
    //     $('.value').counterUp({
    //       delay: 10,
    //       time: 2000
    //     });
    // })(jQuery);
  }

  Testing() {
   
    // var name = $("#textName").val();
    // alert(name)
  }

}
