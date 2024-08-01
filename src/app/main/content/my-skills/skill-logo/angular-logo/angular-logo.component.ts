import { Component } from '@angular/core';

@Component({
  selector: 'app-angular-logo',
  standalone: true,
  imports: [],
  templateUrl: './angular-logo.component.html',
  styleUrl: './angular-logo.component.scss'
})
export class AngularLogoComponent {
    constructor(private ctx: CanvasRenderingContext2D) {}
  
    draw(x: number, y: number, scale: number) {
      const ctx = this.ctx;
      ctx.save(); // Zustand speichern
      ctx.translate(x, y);
      ctx.scale(scale, scale);
  
      // Zeichnen des äußeren sechseckigen Schildes in neon pink
      ctx.beginPath();
      ctx.moveTo(400, 100);
      ctx.lineTo(540, 200);
      ctx.lineTo(500, 400);
      ctx.lineTo(300, 400);
      ctx.lineTo(260, 200);
      ctx.closePath();
      ctx.fillStyle = '#FF007F'; // Neon Pink
      ctx.fill();
  
      // Zeichnen des inneren sechseckigen Schildes in neon pink
      ctx.beginPath();
      ctx.moveTo(400, 120);
      ctx.lineTo(520, 200);
      ctx.lineTo(480, 380);
      ctx.lineTo(320, 380);
      ctx.lineTo(280, 200);
      ctx.closePath();
      ctx.fillStyle = '#FF007F'; // Neon Pink
      ctx.fill();
  
      // Zeichnen des 'A' in der Mitte in der Hintergrundfarbe (`#1b1b1b`)
      ctx.beginPath();
      ctx.moveTo(350, 340);
      ctx.lineTo(390, 200);
      ctx.lineTo(410, 200);
      ctx.lineTo(450, 340);
      ctx.lineTo(425, 340);
      ctx.lineTo(400, 260);
      ctx.lineTo(375, 340);
      ctx.closePath();
      ctx.fillStyle = '#1b1b1b';
      ctx.fill();
  
      // Zeichnen des Trennstrichs im 'A' in der Mitte in der Hintergrundfarbe (`#1b1b1b`)
      ctx.beginPath();
      ctx.moveTo(380, 260);
      ctx.lineTo(420, 260);
      ctx.lineTo(420, 270);
      ctx.lineTo(380, 270);
      ctx.closePath();
      ctx.fillStyle = '#1b1b1b';
      ctx.fill();
  
      ctx.restore(); // Zustand wiederherstellen
    }
  }