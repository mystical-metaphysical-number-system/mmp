import useBaseUrl from '@docusaurus/useBaseUrl';

interface DocVideoProps {
  src: string;
  controls?: boolean;
}

function getYouTubeEmbedUrl(src: string): string | null {
  try {
    const url = new URL(src);
    const host = url.hostname.replace(/^www\./, '');
    if (host === 'youtu.be') {
      const id = url.pathname.slice(1);
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (url.pathname === '/watch') {
        const id = url.searchParams.get('v');
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }
      if (url.pathname.startsWith('/embed/')) {
        return src;
      }
    }
  } catch {
    return null;
  }
  return null;
}

export default function DocVideo({src, controls = true}: DocVideoProps) {
  const youtubeUrl = getYouTubeEmbedUrl(src);
  if (youtubeUrl) {
    return (
      <iframe
        width="100%"
        style={{aspectRatio: '16/9'}}
        src={youtubeUrl}
        title="Embedded YouTube video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  const isExternal = /^https?:\/\//.test(src);
  const url = isExternal ? src : useBaseUrl(src);
  return (
    <video
      src={url}
      controls={controls}
      muted
      loop
      playsInline
      style={{maxWidth: '100%', width: '100%'}}
    />
  );
}

interface DocImgProps {
  src: string;
  style?: React.CSSProperties;
}

export function DocImg({src, style}: DocImgProps) {
  const isExternal = /^https?:\/\//.test(src);
  const url = isExternal ? src : useBaseUrl(src);
  return <img src={url} style={style} />;
}
