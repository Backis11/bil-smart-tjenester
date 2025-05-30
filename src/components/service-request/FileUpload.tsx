
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Camera, Video, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  type: 'image' | 'video';
}

interface FileUploadProps {
  uploadedFiles: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
}

const FileUpload = ({ uploadedFiles, onFilesChange }: FileUploadProps) => {
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles: UploadedFile[] = [];

    Array.from(files).forEach((file) => {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Fil for stor",
          description: "Maksimal filstørrelse er 10MB",
          variant: "destructive"
        });
        return;
      }

      // Check file type
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      
      if (!isImage && !isVideo) {
        toast({
          title: "Ugyldig filtype",
          description: "Kun bilder og videoer er tillatt",
          variant: "destructive"
        });
        return;
      }

      const fileId = Math.random().toString(36).substr(2, 9);
      const preview = URL.createObjectURL(file);
      
      newFiles.push({
        id: fileId,
        file,
        preview,
        type: isImage ? 'image' : 'video'
      });
    });

    onFilesChange([...uploadedFiles, ...newFiles]);

    // Reset input
    event.target.value = '';
  };

  const removeFile = (fileId: string) => {
    const fileToRemove = uploadedFiles.find(f => f.id === fileId);
    if (fileToRemove) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
    onFilesChange(uploadedFiles.filter(f => f.id !== fileId));
  };

  return (
    <div>
      <Label>Last opp bilder eller videoer (valgfritt)</Label>
      <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Camera className="h-8 w-8 text-gray-400" />
          <Video className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-gray-600 font-medium">Legg til bilder eller videoer</p>
        <p className="text-sm text-gray-500 mb-3">Hjelper verkstedet å forstå problemet bedre</p>
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
        />
        <Button type="button" variant="outline" asChild>
          <label htmlFor="file-upload" className="cursor-pointer">
            Velg filer
          </label>
        </Button>
      </div>

      {/* Display uploaded files */}
      {uploadedFiles.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          {uploadedFiles.map((file) => (
            <div key={file.id} className="relative">
              {file.type === 'image' ? (
                <img
                  src={file.preview}
                  alt="Preview"
                  className="w-full h-20 object-cover rounded-lg"
                />
              ) : (
                <video
                  src={file.preview}
                  className="w-full h-20 object-cover rounded-lg"
                  controls={false}
                />
              )}
              <button
                type="button"
                onClick={() => removeFile(file.id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="h-3 w-3" />
              </button>
              <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                {file.type === 'image' ? <Camera className="h-3 w-3" /> : <Video className="h-3 w-3" />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
