'use client';

import { toast } from '@/hooks/use-toast';
import config from '@/lib/config';
import { IKImage, ImageKitProvider, IKUpload } from 'imagekitio-next';
import Image from 'next/image';
import { useRef, useState } from 'react';

const {
  env: {
    imageKit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        'Authentication request failed with status: ' +
          response.status +
          ' ' +
          errorText,
      );
    }

    const data = await response.json();

    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    } else {
      throw new Error('Authentication request failed: Unknown error');
    }
  }
};

export default function ImageUpload({
  onFileChange,
}: Readonly<{ onFileChange: (filePath: string) => void }>) {
  const ikUploadRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (error: unknown) => {
    if (error instanceof Error) {
      console.error(`Upload error: ${error.message}`);
    } else {
      console.error('Upload error: Unknown error');
    }

    toast({
      title: 'File upload failed',
      description: 'Your image could not be uploaded. Please try again.',
      variant: 'destructive',
    });
  };

  const onSuccess = (res: { filePath: string }) => {
    setFile(res);
    onFileChange(res.filePath);

    toast({
      title: 'File uploaded successfully',
      description: `${res.filePath} uploaded successfully`,
    });
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-upload.png"
      />

      <button
        className="upload-btn"
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src={'/icons/upload.svg'}
          width={20}
          height={20}
          alt="Upload"
          className="object-contain"
        />

        <p className="text-base text-light-100">Upload a File</p>

        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>

      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
          className="rounded-lg"
        />
      )}
    </ImageKitProvider>
  );
}
