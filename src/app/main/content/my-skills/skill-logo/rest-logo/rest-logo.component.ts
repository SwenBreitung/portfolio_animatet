import { Component } from '@angular/core';

@Component({
  selector: 'app-rest-logo',
  standalone: true,
  imports: [],
  templateUrl: './rest-logo.component.html',
  styleUrl: './rest-logo.component.scss'
})
export class RestLogoComponent {
  constructor(private ctx: CanvasRenderingContext2D) {}

  draw(x: number, y: number, scale: number) {
    const ctx = this.ctx;
    ctx.save(); // Zustand speichern
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    // Zeichnen des Zahnrads
    this.drawGear(ctx, 400, 250, 100, 12, 40, 20);

    // Zeichnen des API-Textes in der Mitte transparent
    ctx.globalCompositeOperation = 'destination-out'; // Setzt den Modus, um Löcher zu schneiden
    ctx.font = 'bold 100px Arial'; // Größere Schriftgröße
    ctx.textAlign = 'center';
    ctx.fillText('API', 400, 280); // Position leicht angepasst

    ctx.restore(); // Zustand wiederherstellen
  }

  private drawGear(ctx: CanvasRenderingContext2D, x: number, y: number, outerRadius: number, numTeeth: number, toothWidth: number, toothDepth: number) {
    const innerRadius = outerRadius - toothDepth;
    const angleStep = (Math.PI * 2) / numTeeth;

    ctx.beginPath();

    for (let i = 0; i < numTeeth; i++) {
      const angle = i * angleStep;
      const nextAngle = (i + 1) * angleStep;

      // Außenkante des Zahns
      ctx.lineTo(x + outerRadius * Math.cos(angle), y + outerRadius * Math.sin(angle));
      ctx.lineTo(x + outerRadius * Math.cos(angle + angleStep / 4), y + outerRadius * Math.sin(angle + angleStep / 4));

      // Innenkante des Zahns
      ctx.lineTo(x + innerRadius * Math.cos(angle + angleStep / 2), y + innerRadius * Math.sin(angle + angleStep / 2));
      ctx.lineTo(x + outerRadius * Math.cos(nextAngle - angleStep / 4), y + outerRadius * Math.sin(nextAngle - angleStep / 4));
      ctx.lineTo(x + outerRadius * Math.cos(nextAngle), y + outerRadius * Math.sin(nextAngle));
    }

    ctx.closePath();
    ctx.fillStyle = '#FF007F'; // Neon Pink
    ctx.fill();
  }
}