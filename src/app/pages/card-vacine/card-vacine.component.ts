import { Component, inject, OnInit } from '@angular/core';
import { VacinesService } from '../../core/services/vacines.service';
import { Router } from '@angular/router';
import { Person } from '../../core/@types/Person';
import { Vacine } from '../../core/@types/Vacine';
import { Dose, DoseTypeEnum } from '../../core/@types/Dose';

@Component({
  selector: 'app-card-vacine',
  standalone: true,
  imports: [],
  templateUrl: './card-vacine.component.html',
  styles: ``,
})
export class CardVacineComponent implements OnInit {
  private vacinesServices = inject(VacinesService);
  public person!: Person;
  public vacineNames: string[] = [];
  public doses: boolean[][] = [];
  public maxDose = 1;
  public maxReforco = 1;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const vacineState = nav?.extras.state?.['item'] as Person;
    if (vacineState) {
      this.person = vacineState;
    }
  }

  public get maxDoseArr() {
    return Array(this.maxDose);
  }

  public get maxReforcoArr() {
    return Array(this.maxReforco);
  }

  public ngOnInit(): void {
    this.vacinesServices.listByPerson(this.person.id).subscribe((resp) => {
      resp.forEach((vacine) => {
        this.vacineNames.push(vacine.nome);
        if (this.maxDose < vacine.numeroDose) {
          this.maxDose = vacine.numeroDose;
        }
        if (this.maxReforco < vacine.numeroReforco) {
          this.maxReforco = vacine.numeroReforco;
        }
      });
      this.doses = Array.from({ length: this.maxDose + this.maxReforco }, () =>
        Array(this.vacineNames.length).fill(false)
      );
      resp.forEach((vacine, i) => {
        vacine.doses.forEach((dose) => {
          console.log(vacine.nome, dose.numero - 1, i, DoseTypeEnum[dose.tipo]);
          if (dose.tipo === DoseTypeEnum.COMUM) {
            this.doses[dose.numero - 1][i] = true;
          } else {
            this.doses[dose.numero + this.maxDose - 1][i] = true;
          }
        });
      });
      console.log(this.doses);
    });
  }
}
