import { useDropzone } from 'react-dropzone';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

export default function LibDropzone({ onDrop }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': [],
      'image/jpeg': [],
      'image/webp': [],
    },
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`flex h-48 cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed transition-colors ${
        isDragActive ? 'border-gray-500 bg-gray-50' : 'border-gray-300 hover:border-gray-400'
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-2 text-gray-500">
        <AddAPhotoIcon sx={{ fontSize: 34 }} />
        <span className="text-sm font-medium">Şəkil əlavə et</span>
      </div>
    </div>
  );
}