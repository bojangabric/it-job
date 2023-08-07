import { useSession } from 'next-auth/react';
import { useState, type ChangeEvent } from 'react';
import { api } from './api';

const toBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        resolve(fileReader.result);
      } else {
        reject(new Error('Failed to read file as base64.'));
      }
    };

    fileReader.onerror = error => {
      reject(error);
    };
  });
};

export const useFileUpload = () => {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'error'>('idle');

  const { update } = useSession();

  const { mutate: updateImage } = api.user.updateImage.useMutation({
    onSuccess: async () => {
      await update();
      setStatus('idle');
    },
    onError: () => setStatus('error')
  });

  const { mutate: updateResume } = api.candidate.updateResume.useMutation({
    onSuccess: async () => {
      await update();
      setStatus('idle');
    },
    onError: () => setStatus('error')
  });

  const upload = async (
    event: ChangeEvent<HTMLInputElement>,
    callback: (input: { file: string; fileName: string }) => void
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const fileName = file.name.replace(/\.[^\/.]+$/, '');
      const base64 = await toBase64(file);

      try {
        setStatus('uploading');
        const result = callback({ file: base64, fileName });
        console.log('File upload successful:', result);
      } catch (error) {
        console.error('File upload error:', error);
      }
    }
  };

  const uploadResume = (event: ChangeEvent<HTMLInputElement>) => {
    void upload(event, updateResume);
  };

  const uploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    void upload(event, updateImage);
  };

  return { uploadImage, uploadResume, status };
};
