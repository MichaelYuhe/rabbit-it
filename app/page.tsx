'use client';

import { useToSvg } from '@hugocxl/react-to-image';
import { useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';

export default function Home() {
  const [images, setImages] = useState([]);

  const onChange = (imageList: ImageListType) => {
    setImages(imageList as never[]);
  };

  const [state, convertToSvg, ref] = useToSvg<HTMLDivElement>({
    onSuccess: data => {
      console.log(data);

      const link = document.createElement('a');
      link.download = 'image.svg';
      link.href = data;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  });

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div className="flex h-full w-full max-w-xl items-center">
        <div ref={ref} className="relative w-full">
          <img src="/device.jpg" alt="device" className="object-cover" />

          <ImageUploading value={images} onChange={onChange} maxNumber={1}>
            {({
              imageList,
              onImageUpload,
            }: {
              imageList: ImageListType;
              onImageUpload: () => void;
            }) => (
              <div className="absolute left-0 top-0 h-full w-full">
                <button
                  disabled={imageList.length > 0}
                  onClick={onImageUpload}
                  className="relative z-[100] flex h-full w-3/4 items-center justify-center rounded-3xl p-4 text-6xl font-semibold text-white"
                >
                  {imageList.length === 0 && (
                    <span className="absolute">+</span>
                  )}

                  {imageList.map((img, idx) => (
                    <img
                      className="z-[50] h-full w-full rounded-[2rem] object-cover"
                      key={idx}
                      src={img.dataURL}
                      alt=""
                    />
                  ))}
                </button>
              </div>
            )}
          </ImageUploading>
        </div>
      </div>

      {images.length > 0 && (
        <button
          className="ml-4 rounded border px-4 py-2 text-white transition-all hover:border-black hover:bg-white hover:text-black"
          onClick={convertToSvg}
        >
          download
        </button>
      )}
    </main>
  );
}
