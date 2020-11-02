import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  notesList: Array<any> = [];
  date: any;
  changeTitle: string;
  selectedItem: any;
  searchTerm: string;
  searchList: Array<any> = [];

  ngOnInit() {
    this.date = new Date();
    this.fetchNotesData();
  }
  // ************************ Method to fetch the Notes Data List *************************
  fetchNotesData() {
    let isNotesPresent = localStorage.getItem('notesData');
    if (isNotesPresent != null && isNotesPresent != undefined && isNotesPresent != '') {
      this.notesList = JSON.parse(isNotesPresent);
    } else {
      for (let i = 1; i < 21; i++) {
        this.notesList.push({ title: 'Note ' + i, description: 'Description for Note ' + i, updatedDate: new Date(), value: i });
      }
      localStorage.setItem('notesData', JSON.stringify(this.notesList));
    }
    this.selectedItem = this.notesList[0]['value'];
    this.searchList = this.notesList;
  }
  // ********************* Show Note as Active if it is selected *******************************
  showActive(note) {
    if (note) {
      return this.selectedItem == note['value'];
    } else {
      return false;
    }
  }
  // *************** On Selecting a Note *****************************
  onNotesSelect(note) {
    this.selectedItem = note['value'];
    let data = this.notesList.filter(item => item.value == this.selectedItem);
    this.changeTitle = data[0]['title'];
  }
  // ****************** On Create/Edit icon Click **********************************
  onAddNote() {
    let noteLength = this.notesList.length;
    let data = [{ title: 'Note ' + noteLength, description: 'Description for Note ' + noteLength, updatedDate: new Date(), value: noteLength }];
    this.notesList = data.concat(this.notesList);
    this.updateLocalStorage();
  }
  // ****************** On Delete icon Click **********************************
  onDeleteNote() {
    let data = this.notesList.filter(item => item.value != this.selectedItem);
    this.notesList = data;
    this.selectedItem = this.notesList[0]['value'];
    this.updateLocalStorage();
  }
  // ****************** Method to update local Storage and update Title **********************
  updateLocalStorage() {
    this.changeTitle = '';
    this.searchTerm = '';
    localStorage.setItem('notesData', JSON.stringify(this.notesList));
  }
  // ****************** Method to filter/Search Notes ***************************
  notesFilter() {
    if (this.searchTerm) {
      let search = this.searchTerm.trim().toLowerCase();
      let data = this.searchList.filter(item =>
        ((item.title.toLowerCase().includes(search)) || (item.description.toLowerCase().includes(search))
        ));
      this.notesList = data;
    } else {
      this.fetchNotesData();
    }
  }
  // ******************* Method to Update Notes **********************************
  updateNotes() {
    let data = this.notesList.filter(item => item.value == this.selectedItem);
    data[0]['title'] = this.changeTitle;
    data[0]['updatedDate'] = new Date();
    localStorage.setItem('notesData', JSON.stringify(this.notesList));
  }
}
