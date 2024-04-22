import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from '../model/person.model';
import { ApiService } from '../Service/shared-service.service';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent {
  @Input() person?: Person;
  @Output() editClicked: EventEmitter<Person> = new EventEmitter<Person>();
  @Output() deleteClicked: EventEmitter<number> = new EventEmitter<number>();

  constructor(private apiService: ApiService) {}


  editPerson(): void {
    this.editClicked.emit(this.person);
  }

  deletePerson(personId: number): void {
    this.deleteClicked.emit(personId); // Emit event with deleted person's ID
  }

  persons: Person[] = [];
}
