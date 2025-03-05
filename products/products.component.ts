import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productForm: FormGroup;
  imagePreviews: string[] = [];
  images: File[] = [];

  categories = ['Barcode scanner', 'Fingerprint Device', 'Barcode Printer', 'Biometric Device', 'ID Card Printer'];
  stockOptions = ['In Stock', 'Out of Stock', 'Limited Stock', 'Pre-Order'];
  materials = ['Plastic', 'Metal'];
  durabilityOptions = ['Low', 'Medium', 'High', 'Ultra Durable'];

  constructor(private fb: FormBuilder, private productService: ProductsService) { // ✅ Inject the service
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      machineId: [{ value: this.generateMachineId(), disabled: true }, Validators.required],
      shortDescription: ['', Validators.required],
      longDescription: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', Validators.required],
      material: ['', Validators.required],
      color: ['#000000', Validators.required],
      durability: ['', Validators.required],
      specifications: this.fb.array([this.createSpecification()])
    });
  }

  ngOnInit(): void {
    this.productService.products$.subscribe(data => {
      console.log('Loaded Products:', data);
    });
  }

  generateMachineId(): string {
    return `MACH-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 8)}`.toUpperCase();
  }

  get specifications(): FormArray {
    return this.productForm.get('specifications') as FormArray;
  }

  createSpecification(): FormGroup {
    return this.fb.group({
      key: ['', Validators.required],
      value: ['', Validators.required]
    });
  }

  addRow() {
    this.specifications.push(this.createSpecification());
  }

  removeRow(index: number) {
    if (this.specifications.length > 1) {
      this.specifications.removeAt(index);
    }
  }

  getFormGroup(index: number): FormGroup {
    return this.specifications.at(index) as FormGroup;
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files.length > 5) {
      alert('You can only upload up to 5 images.');
      return;
    }

    this.imagePreviews = [];
    this.images = [];

    for (let file of files) {
      this.images.push(file);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number): void {
    this.imagePreviews.splice(index, 1);
    this.images.splice(index, 1);
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = {
        ...this.productForm.getRawValue(),
        images: this.imagePreviews
      };
  
      this.productService.addProduct(formData);
  
      alert('Product added successfully!');
  
      this.productForm.reset();
      this.imagePreviews = [];
      this.productForm.setControl('specifications', this.fb.array([this.createSpecification()]));
    } else {
      console.log('Please fill in all required fields.');
    }
  }
  
  resetAndClearProducts() {
    this.productService.clearProducts();
    this.productForm.reset();
  }

}
