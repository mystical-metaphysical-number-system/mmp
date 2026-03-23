import useBaseUrl from '@docusaurus/useBaseUrl';

interface DocVideoProps {
  src: string;
  controls?: boolean;
}

export default function DocVideo({src, controls = true}: DocVideoProps) {
  const url = useBaseUrl(src);
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
  const url = useBaseUrl(src);
  return <img src={url} style={style} />;
}
