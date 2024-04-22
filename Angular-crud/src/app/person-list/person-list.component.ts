import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Service/shared-service.service';
import { Person } from '../model/person.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  persons: Person[] = [];
  filteredPersons: Person[] = [];
  searchQuery: any = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.fetchPersons();
    // this.apiService.personDeleted.subscribe((deletedPersonId: number) => {
    //   this.persons = this.persons.filter(person => person.id !== deletedPersonId);
    // });

  }

  fetchPersons() {
    this.apiService.getPersons().subscribe((data: Person[]) => {
      this.persons = data;
      this.filteredPersons = [...this.persons]; // Initialize filtered persons with all persons
    });
  }

  editPerson(person: Person): void {
    this.router.navigate(['/edit-person', person.id]); // Navigate to edit-person route with person ID
  }

  deletePerson(personId: any): void {
    this.apiService.deletePerson(personId).subscribe(
      () => {
        console.log('Person deleted successfully');
        this.ngOnInit()
       },
      (error: any) => {
        console.error('Error deleting person:', error);
      }
    );
  }

  filterPersons() {
    console.log("filtering persons", this.searchQuery);
    if (this.searchQuery.trim() === '') {
      this.filteredPersons = [...this.persons]; // Display all persons if search query is empty
    } else {
      this.filteredPersons = this.persons.filter(person =>
        person.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
}
