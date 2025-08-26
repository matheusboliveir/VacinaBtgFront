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
  private personService = inject(PeopleService);
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
          });
      }
    } else {
      alert('Formulário inválido!');
    }
  }
}
