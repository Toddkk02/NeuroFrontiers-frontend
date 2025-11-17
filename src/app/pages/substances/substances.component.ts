import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

interface Substance {
  id: number;
  name: string;
  molecularName: string;
  formula: string;
  alsoKnownAs: string[];
  image: string;
  category: string;
  shortDescription: string;
}

@Component({
  selector: 'app-substances',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './substances.component.html',
  styleUrls: ['./substances.component.css']
})
export class SubstancesComponent implements OnInit {
  substances: Substance[] = [
    {
      id: 1,
      name: 'DMT',
      molecularName: 'N,N-Dimethyltryptamine',
      formula: 'C₁₂H₁₆N₂',
      alsoKnownAs: ['Dimitri', 'Spirit Molecule'],
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/DMT.svg/1200px-DMT.svg.png',
      category: 'Psychedelic',
      shortDescription: 'Powerful short-acting psychedelic producing intense visual experiences'
    },
    {
      id: 2,
      name: 'LSD',
      molecularName: 'Lysergic Acid Diethylamide',
      formula: 'C₂₀H₂₅N₃O',
      alsoKnownAs: ['Acid', 'Lucy'],
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/LSD-2D%2C_3D.png/1200px-LSD-2D%2C_3D.png',
      category: 'Psychedelic',
      shortDescription: 'Long-lasting psychedelic known for profound consciousness alterations'
    },
    {
      id: 3,
      name: 'Psilocybin',
      molecularName: '4-phosphoryloxy-N,N-dimethyltryptamine',
      formula: 'C₁₂H₁₇N₂O₄P',
      alsoKnownAs: ['Magic Mushrooms', 'Shrooms'],
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Psilocybin.svg/1200px-Psilocybin.svg.png',
      category: 'Psychedelic',
      shortDescription: 'Natural psychedelic from mushrooms with introspective properties'
    },
    {
      id: 4,
      name: 'MDMA',
      molecularName: '3,4-Methylenedioxymethamphetamine',
      formula: 'C₁₁H₁₅NO₂',
      alsoKnownAs: ['Ecstasy', 'Molly'],
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/MDMA_%28simple%29.svg/1200px-MDMA_%28simple%29.svg.png',
      category: 'Entactogen',
      shortDescription: 'Empathogenic substance producing euphoria and emotional openness'
    },
    {
      id: 5,
      name: 'Ketamine',
      molecularName: '(RS)-2-(2-Chlorophenyl)-2-(methylamino)cyclohexanone',
      formula: 'C₁₃H₁₆ClNO',
      alsoKnownAs: ['K', 'Special K'],
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Ketamine-2D-skeletal.svg/1200px-Ketamine-2D-skeletal.svg.png',
      category: 'Dissociative',
      shortDescription: 'Dissociative anesthetic producing out-of-body experiences'
    },
    {
      id: 6,
      name: 'Cannabis',
      molecularName: 'Delta-9-Tetrahydrocannabinol',
      formula: 'C₂₁H₃₀O₂',
      alsoKnownAs: ['Weed', 'Marijuana'],
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Delta-9-tetrahydrocannabinol-from-xtal-3D-balls.png/1200px-Delta-9-tetrahydrocannabinol-from-xtal-3D-balls.png',
      category: 'Cannabinoid',
      shortDescription: 'Plant containing psychoactive compounds producing relaxation'
    },
    {
      id: 7,
      name: 'Mescaline',
      molecularName: '3,4,5-Trimethoxyphenethylamine',
      formula: 'C₁₁H₁₇NO₃',
      alsoKnownAs: ['Peyote', 'San Pedro'],
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Mescaline.svg/1200px-Mescaline.svg.png',
      category: 'Psychedelic',
      shortDescription: 'Natural psychedelic from cacti with spiritual significance'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  viewSubstance(id: number) {
    this.router.navigate(['/substance', id]);
  }
}
