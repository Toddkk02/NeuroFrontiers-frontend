import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

interface Substance {
  id: number;
  name: string;
  molecularName: string;
  formula: string;
  alsoKnownAs: string[];
  image: string;
  description: string;
  effects: string[];
  dosage: {
    threshold: string;
    light: string;
    common: string;
    strong: string;
    heavy: string;
  };
  duration: {
    onset: string;
    comeup: string;
    peak: string;
    offset: string;
    total: string;
  };
  safetyInfo: string[];
  interactions: string[];
}

@Component({
  selector: 'app-substance-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule
  ],
  templateUrl: './substance-detail.component.html',
  styleUrls: ['./substance-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubstanceDetailComponent implements OnInit {
  substance: Substance | null = null;
  loading = false;
  error = '';

  private readonly substances: Substance[] = [
    {
      id: 1,
      name: 'DMT',
      molecularName: 'N,N-Dimethyltryptamine',
      formula: 'C₁₂H₁₆N₂',
      alsoKnownAs: ['Dimethyltryptamine', 'Dimitri', 'Spirit Molecule'],
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/DMT.svg/1200px-DMT.svg.png',
      description: 'DMT is a powerful psychedelic compound that occurs naturally in many plants and animals. Known for producing intense, short-lived visual and auditory hallucinations.',
      effects: [
        'Intense visual hallucinations',
        'Altered perception of time and space',
        'Ego dissolution',
        'Spiritual/mystical experiences',
        'Auditory distortions',
        'Body sensations'
      ],
      dosage: {
        threshold: '5-10 mg (vaporized)',
        light: '10-20 mg',
        common: '20-40 mg',
        strong: '40-60 mg',
        heavy: '60+ mg'
      },
      duration: {
        onset: '0-2 minutes',
        comeup: '0-2 minutes',
        peak: '2-5 minutes',
        offset: '5-10 minutes',
        total: '10-20 minutes'
      },
      safetyInfo: [
        'Generally considered physically safe',
        'May cause psychological distress in unprepared users',
        'Not recommended for those with psychotic disorders',
        'Ensure a safe, comfortable environment',
        'Have a trusted sitter present'
      ],
      interactions: [
        '⚠️ DANGEROUS: MAOIs (can cause serotonin syndrome)',
        '⚠️ CAUTION: SSRIs and other antidepressants',
        '⚠️ CAUTION: Stimulants (increased anxiety)',
        '✓ Generally safe: Cannabis (but may intensify experience)'
      ]
    },
    {
      id: 2,
      name: 'LSD',
      molecularName: 'Lysergic Acid Diethylamide',
      formula: 'C₂₀H₂₅N₃O',
      alsoKnownAs: ['Acid', 'Lucy', 'Tabs', 'Blotter'],
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/LSD-2D%2C_3D.png/1200px-LSD-2D%2C_3D.png',
      description: 'LSD is a semi-synthetic psychedelic known for its profound effects on consciousness, perception, and cognition. It\'s one of the most potent psychoactive substances known.',
      effects: [
        'Visual hallucinations and distortions',
        'Enhanced pattern recognition',
        'Synesthesia',
        'Altered sense of time',
        'Profound introspection',
        'Emotional amplification',
        'Enhanced creativity'
      ],
      dosage: {
        threshold: '10-20 μg',
        light: '25-75 μg',
        common: '75-150 μg',
        strong: '150-300 μg',
        heavy: '300+ μg'
      },
      duration: {
        onset: '20-60 minutes',
        comeup: '30-90 minutes',
        peak: '3-5 hours',
        offset: '3-5 hours',
        total: '8-12 hours'
      },
      safetyInfo: [
        'Physically safe, no known lethal dose',
        'Psychological risks for unprepared users',
        'May trigger latent mental health issues',
        'Test your substance (many RCs sold as LSD)',
        'Set and setting are crucial',
        'Avoid if family history of schizophrenia'
      ],
      interactions: [
        '⚠️ CAUTION: Lithium (increased risk of seizures)',
        '⚠️ CAUTION: Tramadol (lowered seizure threshold)',
        '✓ Generally safe: Cannabis',
        '✓ Synergistic: Psilocybin, DMT'
      ]
    },
    {
      id: 3,
      name: 'Psilocybin',
      molecularName: '4-phosphoryloxy-N,N-dimethyltryptamine',
      formula: 'C₁₂H₁₇N₂O₄P',
      alsoKnownAs: ['Magic Mushrooms', 'Shrooms', 'Psilocin', 'Mushrooms'],
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Psilocybin.svg/1200px-Psilocybin.svg.png',
      description: 'Psilocybin is a naturally occurring psychedelic prodrug found in over 200 species of mushrooms. It converts to psilocin in the body and has been used for centuries in spiritual practices.',
      effects: [
        'Visual and auditory hallucinations',
        'Altered perception of time',
        'Emotional introspection',
        'Euphoria and well-being',
        'Spiritual experiences',
        'Enhanced appreciation of music and art',
        'Thought loops'
      ],
      dosage: {
        threshold: '0.25-0.5 g dried',
        light: '0.5-1 g',
        common: '1-2.5 g',
        strong: '2.5-4 g',
        heavy: '4+ g'
      },
      duration: {
        onset: '20-40 minutes',
        comeup: '30-60 minutes',
        peak: '2-3 hours',
        offset: '2-3 hours',
        total: '4-7 hours'
      },
      safetyInfo: [
        'Very low toxicity',
        'Non-addictive',
        'Psychological risks in unsuitable environment',
        'Nausea common during come-up',
        'Ensure proper mushroom identification',
        'Not recommended for those with psychotic disorders'
      ],
      interactions: [
        '⚠️ CAUTION: SSRIs (may reduce effects)',
        '⚠️ CAUTION: Lithium (seizure risk)',
        '✓ Generally safe: Cannabis',
        '✓ Synergistic: LSD, DMT'
      ]
    },
    {
      id: 4,
      name: 'MDMA',
      molecularName: '3,4-Methylenedioxymethamphetamine',
      formula: 'C₁₁H₁₅NO₂',
      alsoKnownAs: ['Ecstasy', 'Molly', 'E', 'XTC', 'Mandy'],
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/MDMA_%28simple%29.svg/1200px-MDMA_%28simple%29.svg.png',
      description: 'MDMA is an empathogenic-entactogenic compound known for producing feelings of euphoria, increased empathy, and enhanced sensory perception.',
      effects: [
        'Intense euphoria',
        'Increased empathy and emotional openness',
        'Enhanced sensory perception',
        'Increased sociability',
        'Feelings of love and connection',
        'Mild visual enhancements',
        'Increased energy'
      ],
      dosage: {
        threshold: '30-50 mg',
        light: '50-75 mg',
        common: '75-125 mg',
        strong: '125-180 mg',
        heavy: '180+ mg'
      },
      duration: {
        onset: '30-60 minutes',
        comeup: '15-30 minutes',
        peak: '2-3 hours',
        offset: '1-2 hours',
        total: '4-6 hours'
      },
      safetyInfo: [
        '⚠️ Risk of hyperthermia - stay hydrated but don\'t overdrink',
        '⚠️ Neurotoxic at high doses or frequent use',
        '⚠️ Test your substance (many adulterants)',
        'Wait at least 3 months between uses',
        'Avoid in hot environments',
        'Dangerous for those with heart conditions'
      ],
      interactions: [
        '🔴 DANGEROUS: MAOIs (potentially fatal)',
        '⚠️ DANGEROUS: SSRIs (serotonin syndrome risk)',
        '⚠️ CAUTION: Alcohol (increased neurotoxicity)',
        '⚠️ CAUTION: Stimulants (increased cardiovascular strain)'
      ]
    },
    {
      id: 5,
      name: 'Ketamine',
      molecularName: '(RS)-2-(2-Chlorophenyl)-2-(methylamino)cyclohexanone',
      formula: 'C₁₃H₁₆ClNO',
      alsoKnownAs: ['K', 'Ket', 'Special K', 'Kitty', 'Vitamin K'],
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Ketamine-2D-skeletal.svg/1200px-Ketamine-2D-skeletal.svg.png',
      description: 'Ketamine is a dissociative anesthetic used medically and recreationally. It produces feelings of detachment from the body and can induce a trance-like state.',
      effects: [
        'Dissociation from body',
        'Visual and auditory distortions',
        'Altered perception of time and space',
        'Out-of-body experiences (K-hole at high doses)',
        'Anesthetic/numbing effects',
        'Dream-like states',
        'Motor impairment'
      ],
      dosage: {
        threshold: '10-20 mg (insufflated)',
        light: '20-50 mg',
        common: '50-100 mg',
        strong: '100-150 mg',
        heavy: '150+ mg (K-hole territory)'
      },
      duration: {
        onset: '5-10 minutes (insufflated)',
        comeup: '5-10 minutes',
        peak: '45-90 minutes',
        offset: '45-90 minutes',
        total: '2-3 hours'
      },
      safetyInfo: [
        '⚠️ Risk of bladder damage with chronic use',
        '⚠️ Risk of injury due to impaired motor function',
        'Lie down in safe environment',
        'Never combine with CNS depressants',
        'Can be psychologically addictive',
        'May cause nausea'
      ],
      interactions: [
        '🔴 DANGEROUS: Alcohol and CNS depressants (respiratory depression)',
        '🔴 DANGEROUS: Benzodiazepines (blackout risk)',
        '⚠️ CAUTION: Stimulants (cardiovascular strain)',
        '⚠️ CAUTION: Psychedelics (confusing experiences)'
      ]
    },
    {
      id: 6,
      name: 'Cannabis',
      molecularName: 'Delta-9-Tetrahydrocannabinol (THC)',
      formula: 'C₂₁H₃₀O₂',
      alsoKnownAs: ['Weed', 'Marijuana', 'Pot', 'Herb', 'Grass', 'Ganja'],
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Delta-9-tetrahydrocannabinol-from-xtal-3D-balls.png/1200px-Delta-9-tetrahydrocannabinol-from-xtal-3D-balls.png',
      description: 'Cannabis is a plant containing psychoactive compounds, primarily THC and CBD. It produces relaxation, altered perception, and has various medical applications.',
      effects: [
        'Relaxation and euphoria',
        'Altered time perception',
        'Enhanced sensory perception',
        'Increased appetite',
        'Mild visual enhancements',
        'Creativity enhancement (subjective)',
        'Short-term memory impairment'
      ],
      dosage: {
        threshold: '2-5 mg THC (oral)',
        light: '5-10 mg',
        common: '10-25 mg',
        strong: '25-50 mg',
        heavy: '50+ mg'
      },
      duration: {
        onset: '5-10 minutes (smoked) / 30-90 min (oral)',
        comeup: '5-10 min (smoked) / 30-60 min (oral)',
        peak: '1-2 hours (smoked) / 2-4 hours (oral)',
        offset: '1-2 hours (smoked) / 2-4 hours (oral)',
        total: '2-4 hours (smoked) / 5-10 hours (oral)'
      },
      safetyInfo: [
        'Generally considered safe',
        'May cause anxiety or paranoia, especially in high doses',
        'Not recommended for those with psychotic disorders',
        'Edibles: start low, go slow (delayed onset)',
        'Impairs driving ability',
        'Can be psychologically habit-forming'
      ],
      interactions: [
        '⚠️ CAUTION: Alcohol (increased impairment)',
        '✓ Synergistic: Psychedelics (can intensify experience)',
        '✓ Generally safe: Most substances (but may intensify)'
      ]
    },
    {
      id: 7,
      name: 'Mescaline',
      molecularName: '3,4,5-Trimethoxyphenethylamine',
      formula: 'C₁₁H₁₇NO₃',
      alsoKnownAs: ['Peyote', 'San Pedro', 'Buttons', 'Cactus'],
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Mescaline.svg/1200px-Mescaline.svg.png',
      description: 'Mescaline is a naturally occurring psychedelic found in several cacti species. It has been used for thousands of years in Native American spiritual practices.',
      effects: [
        'Visual hallucinations with geometric patterns',
        'Enhanced color perception',
        'Emotional introspection',
        'Spiritual experiences',
        'Enhanced empathy',
        'Altered sense of time',
        'Body euphoria'
      ],
      dosage: {
        threshold: '50-100 mg',
        light: '100-200 mg',
        common: '200-300 mg',
        strong: '300-500 mg',
        heavy: '500+ mg'
      },
      duration: {
        onset: '60-90 minutes',
        comeup: '60-120 minutes',
        peak: '4-6 hours',
        offset: '3-4 hours',
        total: '10-14 hours'
      },
      safetyInfo: [
        'Generally considered safe physically',
        'Nausea and vomiting common (especially with cactus preparation)',
        'Long duration - plan accordingly',
        'Set and setting important',
        'Not recommended for those with heart conditions',
        'Avoid if family history of psychotic disorders'
      ],
      interactions: [
        '⚠️ CAUTION: MAOIs (may potentiate effects)',
        '⚠️ CAUTION: Tramadol (lowered seizure threshold)',
        '✓ Synergistic: Other psychedelics',
        '✓ Generally safe: Cannabis'
      ]
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadSubstance(parseInt(id));
    }
  }

  loadSubstance(id: number) {
    this.substance = this.substances.find(s => s.id === id) || null;
    if (!this.substance) {
      this.error = 'Substance not found';
    }
    this.cdr.markForCheck();
  }

  goBack() {
    this.router.navigate(['/substances']);
  }
}
