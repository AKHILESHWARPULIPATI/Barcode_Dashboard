import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-add-category',
  imports: [],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  newSubcategory: string = '';
  displayedColumns: string[] = ['subcategory'];

  constructor(
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category: any }
  ) {}

  addSubcategory() {
    if (this.newSubcategory) {
      this.data.category.subcategories.push(this.newSubcategory);
      this.newSubcategory = '';
    }
  }

  onSave() {
    this.dialogRef.close(this.data.category);
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
