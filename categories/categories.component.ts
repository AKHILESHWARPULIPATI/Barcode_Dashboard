import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-categories',
  imports: [CommonModule, FormsModule, RouterLink, MatDialogModule, MatButtonModule, MatInputModule, MatTableModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  searchTerm: string = '';
  newSubcategory: string = '';
  newCategory: any = { name: '', subcategories: [] };

  categories = [
    {
      code: 'BP',
      name: 'Barcode Printer',
      subcategories: [
        'Desktop Barcode Printer',
        'Industrial Barcode Printers',
        'Color Barcode Printer',
        'RFID Printer',
        'Portable Mobile Printer',
        'Wrist Band Printer'
      ]
    },
    {
      code: 'ID',
      name: 'ID Card Printer',
      subcategories: [
        'Single Side ID Card Printer',
        'Dual Sided ID Card Printer',
        'Badge Printer',
        'Retransfer ID Card Printer'
      ]
    },
    {
      code: 'BS',
      name: 'Barcode Scanner',
      subcategories: [
        'Fixed Mount Scanner',
        '2D Barcode Scanner',
        'Wireless Barcode Scanner',
        'Industrial Barcode Scanner'
      ]
    },
    {
      code: 'BD',
      name: 'Biometric Device',
      subcategories: [
        'Time Attendance and Access Control',
        'Fingerprint Reader'
      ]
    },
    {
      code: 'BT',
      name: 'Biometric Tablet and Software',
      subcategories: ['Software']
    },
    {
      code: 'POS',
      name: 'Point Of Sale',
      subcategories: [
        'Receipt Printer',
        'Pos Machine',
        'Magnetic Stripe Reader',
        'POS Cash Drawer'
      ]
    },
    {
      code: 'CM',
      name: 'Cash Counting Machine',
      subcategories: [
        'Coin Counters & Sorters',
        'Money Detector',
        'Bill Counters & Sorters'
      ]
    },
    {
      code: 'MC',
      name: 'Mobile Computer',
      subcategories: [
        'Handheld Mobile Computer',
        'Personal Shopper',
        'Datalogic Mobile Computer',
        'Newland Mobile Computer',
        'Healthcare Mobile Computer',
        'All collections'
      ]
    },
    {
      code: 'ES',
      name: 'E Signature Pad & Passport Scanner',
      subcategories: [
        'Smart Card Reader',
        'HID OMNIKEY',
        'ACS Card Reader',
        'Topaz Systems',
        'Passport Scanner'
      ]
    }
  ];

  get filteredCategories() {
    return this.categories.filter(category =>
      category.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      category.subcategories.some(sub => sub.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  highlightMatch(text: string): string {
    if (!this.searchTerm) return text;
    const regex = new RegExp(this.searchTerm, 'gi');
    return text.replace(regex, match => `<span class="highlight">${match}</span>`);
  }
}
