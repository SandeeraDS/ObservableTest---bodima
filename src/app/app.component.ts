import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { ApiServices } from './API.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ObservableTest';
  
  constructor(private apiServices: ApiServices) { }
  
  ngOnInit() {
    this.apiServices.getProjectID().subscribe(
      (data: string) => { this.getBoardId(data) 
        
        //localStorage.setItem("projectID",data);
      },
      (error: string) => { console.log(error) },
      () => { console.log('completed') }
    );
  }

  getBoardId(p_id: string) {
    this.apiServices.getBoardID(p_id).subscribe(
      (data: string) => { this.getSprintData(data); },
      (error: string) => { console.log(error) },
      () => { console.log('completed') }
    );
  }

  getSprintData(boardID:string){
    this.apiServices.getSprintDetails(boardID).subscribe(
      (data: object) => { console.log(data); this.getGraphData(data['sId'])},
      (error: string) => { console.log(error) },
      () => { console.log('completed') }
    );
  }

  getGraphData(sprintId:string){
    console.log("in graph method "+sprintId);
    //console.log(localStorage.getItem("projectID"));
   // console.log(localStorage.getItem(projectID));
   this.apiServices.getGraphData(sprintId).subscribe(
    (data: object) => { console.log(data);},
    (error: string) => { console.log(error) },
    () => { console.log('completed') }
  );
  }
}
