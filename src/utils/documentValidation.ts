
export const validateDocumentFile = (file: File) => {
  // Validate file size (max 10MB)
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('Fil for stor. Maksimal størrelse er 10MB.');
  }

  // Validate file type
  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Ugyldig filtype. Støttede typer: PDF, JPG, PNG, DOC, DOCX');
  }
};

export const createFilePath = (userId: string, carId: string, fileName: string): string => {
  const fileExt = fileName.split('.').pop();
  const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  return `${userId}/${carId}/${uniqueFileName}`;
};
