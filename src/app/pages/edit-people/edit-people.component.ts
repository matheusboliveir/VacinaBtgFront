import { Component, inject, OnInit } from '@angular/core';
import { Person } from '../../core/@types/Person';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PeopleService } from '../../core/services/people.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VacinesService } from '../../core/services/vacines.service';
import { DosesService } from '../../core/services/doses.service';
import { Dose, DoseTypeEnum } from '../../core/@types/Dose';
import { Vacine } from '../../core/@types/Vacine';
import { RequestAddDose } from '../../core/@types/DosesService';

@Component({
  selector: 'app-edit-people',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-people.component.html',
  styles: ``,
})
export class EditPeopleComponent implements OnInit {
  public person?: Person;
  public personForm!: FormGroup;
  public doseForm!: FormGroup;
  public doses: Dose[] = [];
  public vacines: Vacine[] = [];
  public doseType = DoseTypeEnum;
  private personService = inject(PeopleService);
  private vacineService = inject(VacinesService);
  private doseService = inject(DosesService);
  private fb = inject(FormBuilder);

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const vacineState = nav?.extras.state?.['item'] as Person;
    if (vacineState) {
      this.person = vacineState;
    }
  }

  public ngOnInit(): void {
    this.personForm = this.fb.group({
      nome: [this.person?.nome || '', [Validators.required]],
      idade: [this.person?.idade || 0, [Validators.required]],
      sexo: [this.person?.sexo || 0, [Validators.required]],
    });
    if (this.person) {
      this.doseForm = this.fb.group({
        tipo: ['', [Validators.required]],
        vacinaId: [0, [Validators.required]],
      });
    }
    this.loadDoses();
    this.loadVacine();
  }

  public deleteDose(id: number) {
    this.doseService.delete(id).subscribe(() => {
      alert('Dose deletada!');
      this.loadDoses();
    });
  }

  public deletePerson() {
    if (!this.person) return;
    this.personService.delete(this.person.id).subscribe(() => {
      alert('Pessoa deletada');
      this.router.navigate(['../']);
    });
  }

  private loadVacine() {
    this.vacineService.list().subscribe((resp) => {
      this.vacines = resp;
    });
  }

  private loadDoses() {
    if (!this.person) return;
    this.vacineService.listByPerson(this.person?.id).subscribe((response) => {
      this.doses = response.flatMap((vacine) =>
        vacine.doses.map((d) => {
          d.vacina = vacine.nome;
          return d;
        })
      );
    });
  }

  public submitDose() {
    if (this.doseForm.valid && this.person) {
      const formValue = this.doseForm.value as Omit<RequestAddDose, 'pessoaId'>;
      console.log(formValue);
      this.doseService
        .add({
          pessoaId: this.person.id,
          tipo: +formValue.tipo,
          vacinaId: +formValue.vacinaId,
        })
        .subscribe(() => {
          alert('Dose Cadastrada!');
          this.loadDoses();
        });
    }
  }

  public submit() {
    if (this.personForm.valid) {
      const formValue = this.personForm.value as Omit<Person, 'doses' | 'id'>;
      if (this.person) {
        const id = this.person.id;
        this.personService
          .edit({
            id,
            nome: formValue.nome,
            idade: formValue.idade,
            sexo: +formValue.sexo,
          })
          .subscribe(() => {
            alert('Pessoa Editada!');
            this.router.navigate(['../']);
          });
      } else {
        this.personService
          .add({
            nome: formValue.nome,
            idade: formValue.idade,
            sexo: +formValue.sexo,
          })
          .subscribe(() => {
            alert('Pessoa Criada!');
            this.router.navigate(['../']);
          });
      }
    } else {
      alert('Formulário inválido!');
    }
  }
}
