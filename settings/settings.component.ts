import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
   userName: string = 'Akhil';
  userEmail: string = 'akhil@zoraizembedded.com';
  userPhone: string = '+91 9110552541';
  userImage: string = 'https://via.placeholder.com/80';

  ngOnInit(): void {
    this.loadUserData();
  }

  editField(field: 'userName' | 'userEmail' | 'userPhone'): void {
    const newValue = prompt(`Enter new ${field.replace('user', '').toLowerCase()}:`, this[field]);
    if (newValue) {
      this[field] = newValue;
      this.saveUserData();
    }
  }

  updateImage(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userImage = e.target.result;
        this.saveUserData();
      };
      reader.readAsDataURL(file);
    }
  }

  saveUserData(): void {
  
    localStorage.setItem('userImage', this.userImage);
  }

  loadUserData(): void {

    const storedImage = localStorage.getItem('userImage');

 
    if (storedImage) this.userImage = storedImage;
  }
}

