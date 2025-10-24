import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  // Return a simple SVG as the Open Graph image
  const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <!-- Background with dot pattern -->
      <defs>
        <pattern id="dots" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <circle cx="25" cy="25" r="2" fill="rgba(0,0,0,0.03)"/>
        </pattern>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#F61111;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#F86262;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#F61111;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#F61111;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#D96D6D;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="1200" height="630" fill="#ffffff"/>
      <rect width="1200" height="630" fill="url(#dots)"/>
      
      <!-- Top bar -->
      <rect width="1200" height="12" fill="url(#gradient)"/>
      
      <!-- Name -->
      <text x="600" y="260" font-family="Arial, sans-serif" font-size="80" font-weight="900" text-anchor="middle" fill="url(#textGradient)">
        Jordan Campbell
      </text>
      
      <!-- Title -->
      <text x="600" y="340" font-family="Arial, sans-serif" font-size="48" font-weight="600" text-anchor="middle" fill="#1a1a1a">
        Software Engineer
      </text>
      
      <!-- Technologies -->
      <g transform="translate(600, 410)">
        <!-- TypeScript -->
        <rect x="-390" y="0" width="150" height="50" fill="#f5f5f5" stroke="#e0e0e0" stroke-width="2" rx="8"/>
        <text x="-315" y="33" font-family="Arial, sans-serif" font-size="24" font-weight="500" text-anchor="middle" fill="#333">TypeScript</text>
        
        <!-- React -->
        <rect x="-210" y="0" width="110" height="50" fill="#f5f5f5" stroke="#e0e0e0" stroke-width="2" rx="8"/>
        <text x="-155" y="33" font-family="Arial, sans-serif" font-size="24" font-weight="500" text-anchor="middle" fill="#333">React</text>
        
        <!-- Angular -->
        <rect x="-70" y="0" width="130" height="50" fill="#f5f5f5" stroke="#e0e0e0" stroke-width="2" rx="8"/>
        <text x="-5" y="33" font-family="Arial, sans-serif" font-size="24" font-weight="500" text-anchor="middle" fill="#333">Angular</text>
        
        <!-- Node.js -->
        <rect x="90" y="0" width="130" height="50" fill="#f5f5f5" stroke="#e0e0e0" stroke-width="2" rx="8"/>
        <text x="155" y="33" font-family="Arial, sans-serif" font-size="24" font-weight="500" text-anchor="middle" fill="#333">Node.js</text>
        
        <!-- Python -->
        <rect x="250" y="0" width="120" height="50" fill="#f5f5f5" stroke="#e0e0e0" stroke-width="2" rx="8"/>
        <text x="310" y="33" font-family="Arial, sans-serif" font-size="24" font-weight="500" text-anchor="middle" fill="#333">Python</text>
      </g>
      
      <!-- URL -->
      <text x="600" y="570" font-family="Arial, sans-serif" font-size="32" text-anchor="middle" fill="#666">
        www.jordancampbell.me
      </text>
      
      <!-- Bottom bar -->
      <rect y="618" width="1200" height="12" fill="url(#gradient)"/>
    </svg>
  `;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, immutable, no-transform, max-age=31536000',
    },
  });
}
