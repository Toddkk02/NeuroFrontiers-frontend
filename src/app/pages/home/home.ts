
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Substance {
  name: string;
  molecularName: string;
  formula: string;
  alsoKnownAs: string[];
  image: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn = false;
  substances: Substance[] = [];   // ← MANCAVA

  constructor(private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = !!localStorage.getItem('token');
    this.loadSubstances();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  loadSubstances() {
    this.substances = [
      {
        name: 'DMT',
        molecularName: 'N,N-Dimetiltriptamina',
        formula: 'C12H16N2',
        alsoKnownAs: ['Dimetiltriptamina', 'Dimitri', 'Businessman\'s Trip'],
        image: 'assets/dmt.png'
      },
      {
        name: 'LSD',
        molecularName: 'Acido lisergico dietilamide',
        formula: 'C20H25N3O',
        alsoKnownAs: ['Acido lisergico', 'Acido diethylamide'],
        image: 'assets/lsd.png'
      },
      {
        name: 'Psilocibina',
        molecularName: '4-fosforilossi-N,N-dimetiltriptamina',
        formula: 'C12H17N2O4P',
        alsoKnownAs: ['Magic Mushrooms'],
        image: 'assets/psilocibina.png'
      }
    ];
  }
}

