/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PropertyData } from '@/lib/types';
import { UploadCloud, XCircle } from 'lucide-react';

interface PhotosStepProps {
  formData: PropertyData;
  errors: Record<string, string>;
  onUpdateField: (field: keyof PropertyData, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const PhotosStep: React.FC<PhotosStepProps> = ({
  formData,
  errors,
  onUpdateField,
  onNext,
  onPrev,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      onUpdateField(
        'images',
        [...formData.images, ...newFiles]
      );
    }
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files) {
      const newFiles = Array.from(event.dataTransfer.files);
      onUpdateField(
        'images',
        [...formData.images, ...newFiles]
      );
    }
  }, [formData.images, onUpdateField]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const removePhoto = (indexToRemove: number) => {
    onUpdateField(
      'images',
      formData.images.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Ajoutez des photos de votre propriété
          </CardTitle>
          <p className="text-center text-gray-600">
            Des photos de haute qualité aident les voyageurs à se projeter.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <UploadCloud className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">
              Glissez-déposez vos photos ici, ou cliquez pour sélectionner
            </p>
            <input
              id="file-upload"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sélectionner des fichiers
            </label>
          </div>

          {errors.photos && (
            <p className="text-sm text-red-500">{errors.photos}</p>
          )}

          {formData.images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
              {formData.images.map((file, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Supprimer la photo"
                  >
                    <XCircle size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
            <p className="font-semibold mb-2">Conseils pour de bonnes photos :</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Utilisez une bonne lumière naturelle.</li>
              <li>Prenez des photos de chaque pièce sous différents angles.</li>
              <li>Mettez en valeur les caractéristiques uniques de votre propriété.</li>
              <li>Assurez-vous que les photos sont nettes et de haute résolution.</li>
            </ul>
          </div>

          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={onPrev}>
              Précédent
            </Button>
            <Button onClick={onNext} className="bg-blue-600 hover:bg-blue-700">
              Suivant
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};