import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterModule, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterModule,RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isSideBarCollapsed = false;
  currentPage = 'Overview'; // Default page

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateCurrentPage();
      });
  }

  toggleSideBar() {
    this.isSideBarCollapsed = !this.isSideBarCollapsed;
  }

  isProductsDropdownOpen = false;
  isOrdersDropdownOpen = false;

  toggleProductsDropdown(): void {
    this.isProductsDropdownOpen = !this.isProductsDropdownOpen;
  }

  toggleOrdersDropdown(): void {
    this.isOrdersDropdownOpen = !this.isOrdersDropdownOpen;
  }

  updateCurrentPage() {
    const routeMap: { [key: string]: string } = {
      '/home': 'Overview',
      '/products': 'Add Product',
      '/product-list': 'Product List',
      '/categories': 'Categories',
      '/orders': 'Order History'
    };

    const currentPath = this.router.url;
    this.currentPage = routeMap[currentPath] || 'Dashboard';
  }
}
