// @ts-ignore
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Jordan Campbell - Software Engineer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, rgba(0, 0, 0, 0.03) 2px, transparent 0)',
          backgroundSize: '50px 50px',
        }}
      >
        {/* Red accent bar at top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '12px',
            background:
              'linear-gradient(90deg, #F61111 0%, #F86262 50%, #F61111 100%)',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px',
          }}
        >
          {/* Name */}
          <div
            style={{
              fontSize: '80px',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #F61111 0%, #D96D6D 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              marginBottom: '20px',
              letterSpacing: '-2px',
            }}
          >
            Jordan Campbell
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '48px',
              fontWeight: 600,
              color: '#1a1a1a',
              marginBottom: '40px',
            }}
          >
            Software Engineer
          </div>

          {/* Technologies */}
          <div
            style={{
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {['TypeScript', 'React', 'Angular', 'Node.js', 'Python'].map(
              (tech) => (
                <div
                  key={tech}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#f5f5f5',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '28px',
                    fontWeight: 500,
                    color: '#333',
                  }}
                >
                  {tech}
                </div>
              )
            )}
          </div>

          {/* URL */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              fontSize: '32px',
              color: '#666',
              fontWeight: 400,
            }}
          >
            www.jordancampbell.me
          </div>
        </div>

        {/* Red accent bar at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '12px',
            background:
              'linear-gradient(90deg, #F61111 0%, #F86262 50%, #F61111 100%)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
