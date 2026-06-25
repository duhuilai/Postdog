import { Component } from '@angular/core';

@Component({
  selector: 'eo-logo',
  template: `
    <svg class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 194 194">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FF6B35"/>
          <stop offset="100%" stop-color="#8B5CF6"/>
        </linearGradient>
        <linearGradient id="capeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#DC2626"/>
          <stop offset="100%" stop-color="#991B1B"/>
        </linearGradient>
      </defs>
      <!-- Background -->
      <rect width="194" height="194" rx="30" fill="url(#bgGrad)"/>
      <!-- Cape -->
      <path d="M50 100 Q97 130 144 100 L150 160 Q97 180 44 160 Z" fill="url(#capeGrad)" opacity="0.9"/>
      <!-- Dog face -->
      <ellipse cx="97" cy="95" rx="45" ry="42" fill="#F5D6A0"/>
      <!-- Ears -->
      <ellipse cx="62" cy="65" rx="18" ry="28" fill="#D4956A" transform="rotate(-15 62 65)"/>
      <ellipse cx="132" cy="65" rx="18" ry="28" fill="#D4956A" transform="rotate(15 132 65)"/>
      <ellipse cx="62" cy="65" rx="12" ry="20" fill="#E8B88A" transform="rotate(-15 62 65)"/>
      <ellipse cx="132" cy="65" rx="12" ry="20" fill="#E8B88A" transform="rotate(15 132 65)"/>
      <!-- Eyes -->
      <ellipse cx="80" cy="90" rx="8" ry="9" fill="#2D1B0E"/>
      <ellipse cx="114" cy="90" rx="8" ry="9" fill="#2D1B0E"/>
      <ellipse cx="82" cy="87" rx="3" ry="3" fill="white"/>
      <ellipse cx="116" cy="87" rx="3" ry="3" fill="white"/>
      <!-- Nose -->
      <ellipse cx="97" cy="105" rx="8" ry="6" fill="#2D1B0E"/>
      <!-- Mouth -->
      <path d="M97 111 Q87 120 80 116" stroke="#2D1B0E" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M97 111 Q107 120 114 116" stroke="#2D1B0E" stroke-width="2" fill="none" stroke-linecap="round"/>
      <!-- Tongue -->
      <ellipse cx="97" cy="120" rx="5" ry="7" fill="#FF6B6B"/>
      <!-- Collar -->
      <rect x="72" y="130" width="50" height="8" rx="4" fill="#DC2626"/>
      <circle cx="97" cy="134" r="4" fill="#FFD700"/>
    </svg>
  `,
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {
  constructor() {}
}
