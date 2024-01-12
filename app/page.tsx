'use client';

import { useToSvg } from '@hugocxl/react-to-image';
import { useRef, useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';

export default function Home() {
  const [images, setImages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const handleTakePhoto = () => {
    if (isRecording) {
      if (!videoRef.current) return;
      // get current frame as image
      const canvas = document.createElement('canvas');

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas
        .getContext('2d')
        ?.drawImage(
          videoRef.current,
          0,
          0,
          videoRef.current.videoWidth,
          videoRef.current.videoHeight
        );

      const dataUrl = canvas.toDataURL('image/png');

      // imagelisttype
      const imageList = [
        {
          dataURL: dataUrl,
          file: new File([dataUrl], 'image.png', { type: 'image/png' }),
        },
      ];

      setImages(imageList as never[]);

      setIsRecording(false);

      return;
    }

    setIsRecording(true);

    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: 'user',
        },
      })
      .then(stream => {
        if (!videoRef.current) return;

        videoRef.current.srcObject = stream;
      })
      .catch(error => {
        console.error('Error accessing media devices.', error);
      });
  };

  return (
    <main className="flex h-screen w-screen items-center justify-center p-4">
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

                  {isRecording && (
                    <video
                      autoPlay
                      ref={videoRef}
                      className="z-[50] h-full w-full rounded-[2rem] object-cover"
                    ></video>
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

          <button
            disabled={images.length > 0}
            onClick={handleTakePhoto}
            className="absolute right-[6.3%] top-[4.9%] h-1/6 w-1/6 rounded-2xl"
          ></button>
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
