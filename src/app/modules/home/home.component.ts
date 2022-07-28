import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  categories = new Set<any>;
  originalJackpots : any[] = [];
  filtredJackpots: any[] = [];
  otherCategories: any[] = ["virtual","fun","ball"];

  activeCategory :String = 'new';

  editPic = false;

  constructor(
    private homeService : HomeService,
    private cdRef: ChangeDetectorRef,

  ) { }

  ngOnInit() {
    this.getJackpot();
  }


  generateJackpots(category : String) : any[] {
  let newd : any[]= [];
  let isHere : boolean =false;
     this.originalJackpots.forEach(
        (jackpot : any)=> {
          if(category === 'other'){
            this.otherCategories.forEach((otherCat)=>{
              if(jackpot.categories.includes(otherCat)){
                newd.push(jackpot);
              }
            })
          }
          else{
            if(jackpot.categories.includes(category.trim()))
            {
              newd.push(jackpot);
            }
          }

        }
      );
        return newd;
  }

  updateList(category : String){
    this.activeCategory = category;
    this.filtredJackpots = this.generateJackpots(category);
    this.cdRef.markForCheck();

  }
  getJackpot(){
      this.homeService.getJackpot().subscribe((jackpots)=>{
        this.originalJackpots = jackpots;

        jackpots.forEach((jackpot: any) => {
          jackpot.categories.forEach(
                    (cat : String) =>{
                      this.categories.add(cat);
                    }
                  )
        });
        this.categories = new Set(Array.from(this.categories).map((category : string)=> this.otherCategories.some((cat)=>cat === category) ? "other" : category));
        this.filtredJackpots = this.generateJackpots('new');
        this.cdRef.markForCheck();
    });
  }
}
