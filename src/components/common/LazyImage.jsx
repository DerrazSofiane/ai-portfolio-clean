import { useState, useEffect, useRef } from 'react';
import { Box, Image, Skeleton } from '@chakra-ui/react';

const LazyImage = ({ src, alt, ...props }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src]);

  return (
    <Box ref={imgRef} position="relative" {...props}>
      {!isLoaded && (
        <Skeleton 
          position="absolute" 
          top={0} 
          left={0} 
          right={0} 
          bottom={0} 
          startColor="brand.backgroundLight"
          endColor="brand.background"
        />
      )}
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          opacity={isLoaded ? 1 : 0}
          transition="opacity 0.3s"
          {...props}
        />
      )}
    </Box>
  );
};

export default LazyImage;