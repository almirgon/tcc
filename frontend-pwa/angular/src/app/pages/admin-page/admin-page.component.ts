import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { Promotion } from 'src/app/models/Promotion';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  public pendingsPromotions: Array<Promotion> = [];
  public loading: boolean;

  constructor(private router: Router, private adminService: AdminService) { 
    this.loading = false;
  }

  ngOnInit(): void {
    this.loading = true;
    this.adminService.getPendingsPromotions().subscribe((response) => {
      this.loading = false;
      response.forEach((data)=>{
        this.pendingsPromotions.push(data);
      })
    })
  }

  redirectTo(id) {
    this.router.navigate(['/admin-room', id]);
  }

  goToWebSite(urlLink){
    return window.open(urlLink, '_blank') 
  }

}
