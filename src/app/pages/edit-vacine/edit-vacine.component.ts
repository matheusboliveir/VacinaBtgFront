import { Component, inject, OnInit } from '@angular/core';
import { Vacine } from '../../core/@types/Vacine';
import { VacinesService } from '../../core/services/vacines.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-vacine',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-vacine.component.html',
  styles: ``,
})
export class EditVacineComponent implements OnInit {
  public vacine?: Vacine;
  public vacineForm!: FormGroup;
  private vacineService = inject(VacinesService);
  private fb = inject(FormBuilder);

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const vacineState = nav?.extras.state?.['item'] as Vacine;
    if (vacineState) {
      this.vacine = vacineState;
    }
  }

  public ngOnInit(): void {
    console.log(this.vacine);

    this.vacineForm = this.fb.group({
      nome: [this.vacine?.nome || '', [Validators.required]],
      tipo: [this.vacine?.tipo || 0, [Validators.required]],
      semLimiteDose: [this.vacine?.semLimiteDose ?? false],
      numeroDose: [this.vacine?.numeroDose || 0, [Validators.required]],
      numeroReforco: [this.vacine?.numeroReforco || 0, [Validators.required]],
    });
  }

  public deleteVacine() {
    if (!this.vacine) return;
    this.vacineService.delete(this.vacine.id).subscribe(() => {
      alert('Vacina deletada!');
      this.router.navigate(['../']);
    });
  }

  public submit() {
    if (this.vacineForm.valid) {
      const formValue = this.vacineForm.value as Omit<Vacine, 'doses' | 'id'>;
      if (this.vacine) {
        const id = this.vacine.id;
        this.vacineService
          .edit({
            id,
            nome: formValue.nome,
            tipo: +formValue.tipo,
            numeroDose: formValue.numeroDose,
            numeroReforco: formValue.numeroReforco,
            semLimiteDose: formValue.semLimiteDose,
          })
          .subscribe(() => {
            alert('Vacina Editada!');
            this.router.navigate(['../']);
          });
      } else {
        this.vacineService
          .add({
            nome: formValue.nome,
            tipo: formValue.tipo,
            numeroDose: formValue.numeroDose,
            numeroReforco: formValue.numeroReforco,
            semLimiteDose: formValue.semLimiteDose,
          })
          .subscribe(() => {
            alert('Vacina Criada!');
            this.router.navigate(['../']);
          });
      }
    } else {
      alert('Formulário inválido!');
    }
  }
}
