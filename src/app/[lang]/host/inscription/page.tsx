/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useCallback, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Home,
  Star,
  Camera,
  Calendar,
  Upload,
  Bed,
  Bath,
  Square,
  XCircle,
  UploadCloud,
} from "lucide-react";
import { useRealEstateRegistrationForm } from "@/hooks/useRegistrationFormEstate";
import { WelcomeStep } from "../_components/steps/WelcomeStep";
import Header from "../../properties/_components/Header";
import { PhotosStep } from "../_components/steps/PhotosStep";
import { ReviewAndPublishStep } from "../_components/steps/ReviewAndPublishStep";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  createPropertyAndUpdateUserEstate,
  UpdateToHost,
} from "@/actions/host";
import { AmenitiesStep } from "../_components/steps/AmenitiesStep";

const stepTitles = [
  "Personal Information",
  "Property Details",
  "Amenities & Features",
  "Property Photos",
  "Matterport Scheduling",
  "Résumé de votre annonce",
];

const stepIcons = [User, Home, Star, Camera, Calendar, Calendar];

const propertyTypes = [
  "APARTMENT",
  "HOUSE",
  "VILLA",
  "STUDIO",
  "CHAMBREPRIVE",
  "CABANE"
];

const amenitiesList = [
  "WiFi",
  "Air Conditioning",
  "Heating",
  "Kitchen",
  "Washing Machine",
  "Dryer",
  "TV",
  "Parking",
  "Pool",
  "Gym",
  "Balcony",
  "Garden",
  "Fireplace",
  "Elevator",
];

const additionalServicesList = [
  "Cleaning Service",
  "Concierge",
  "24/7 Security",
  "Pet Friendly",
  "Smoking Allowed",
  "Events Allowed",
  "Long Term Stays",
  "Business Travel Ready",
];

const RealEstateRegistrationForm = () => {
  const {
    currentStep,
    formData,
    errors,
    updateFormData,
    nextStep,
    goToStep,
    prevStep,
    getProgress,
  } = useRealEstateRegistrationForm();

  const stepProps = {
    formData,
    errors,

    onUpdateField: updateFormData,
    onNext: nextStep,
    onPrev: prevStep,
  };
  const { data: session, update } = useSession();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      stepProps.onUpdateField("images", [...formData.images, ...newFiles]);
    }
  };
  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      if (event.dataTransfer.files) {
        const newFiles = Array.from(event.dataTransfer.files);
        stepProps.onUpdateField("images", [...formData.images, ...newFiles]);
      }
    },
    [formData.images, stepProps.onUpdateField]
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(true);
    },
    []
  );

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const removePhoto = (indexToRemove: number) => {
    stepProps.onUpdateField(
      "images",
      formData.images.filter((_, index) => index !== indexToRemove)
    );
  };
  const handleAmenityToggle = (amenity: string) => {
    const current = formData.amenities;
    const updated = current.includes(amenity)
      ? current.filter((a: any) => a !== amenity)
      : [...current, amenity];
    updateFormData("amenities", updated);
  };

  const handleServiceToggle = (service: string) => {
    const current = formData.additionalServices;
    const updated = current.includes(service)
      ? current.filter((s: any) => s !== service)
      : [...current, service];
    updateFormData("additionalServices", updated);
  };
  const finish = async () => {
    if (!session) return;
    startTransition(async () => {
      const result = await createPropertyAndUpdateUserEstate(formData);

      if (result.success) {
        const res = await UpdateToHost(session?.user.id);

        if (res.success) {
          await update({ role: "HOST" });

          toast.success(
            "Félicitations ! Votre annonce a été publiée avec succès !"
          );

          router.push("/host/dashboard");
        }
      } else {
        toast.error("Erreur: " + result.error);
      }
    });
  };
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep onNext={nextStep} />;
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  className={errors.firstName ? "border-destructive" : ""}
                />
                {errors.firstName && (
                  <p className="text-sm text-destructive">{errors.firstName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                  className={errors.lastName ? "border-destructive" : ""}
                />
                {errors.lastName && (
                  <p className="text-sm text-destructive">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                readOnly
                onChange={(e) => updateFormData("email", e.target.value)}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  className={errors.password ? "border-destructive" : ""}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    updateFormData("confirmPassword", e.target.value)
                  }
                  className={errors.confirmPassword ? "border-destructive" : ""}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) =>
                    updateFormData("acceptTerms", checked)
                  }
                />
                <Label htmlFor="acceptTerms" className="text-sm">
                  I accept the Terms and Conditions
                </Label>
              </div>
              {errors.acceptTerms && (
                <p className="text-sm text-destructive">{errors.acceptTerms}</p>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptPrivacy"
                  checked={formData.acceptPrivacy}
                  onCheckedChange={(checked) =>
                    updateFormData("acceptPrivacy", checked)
                  }
                />
                <Label htmlFor="acceptPrivacy" className="text-sm">
                  I accept the Privacy Policy
                </Label>
              </div>
              {errors.acceptPrivacy && (
                <p className="text-sm text-destructive">
                  {errors.acceptPrivacy}
                </p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Property Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => updateFormData("title", e.target.value)}
                placeholder="Beautiful apartment in city center"
                className={errors.title ? "border-destructive" : ""}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyType">Property Type</Label>
              <Select
                value={formData.propertyType}
                onValueChange={(value) => updateFormData("propertyType", value)}
              >
                <SelectTrigger
                  className={errors.propertyType ? "border-destructive" : ""}
                >
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.propertyType && (
                <p className="text-sm text-destructive">
                  {errors.propertyType}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => updateFormData("address", e.target.value)}
                placeholder="123 Main Street"
                className={errors.address ? "border-destructive" : ""}
              />
              {errors.address && (
                <p className="text-sm text-destructive">{errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  readOnly
                  value={formData.country}
                  onChange={(e) => updateFormData("country", e.target.value)}
                  placeholder="Morocco"
                  className={errors.country ? "border-destructive" : ""}
                />
                {errors.country && (
                  <p className="text-sm text-destructive">{errors.country}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => updateFormData("city", e.target.value)}
                  placeholder="Casablanca"
                  className={errors.city ? "border-destructive" : ""}
                />
                {errors.city && (
                  <p className="text-sm text-destructive">{errors.city}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bedrooms" className="flex items-center gap-2">
                  <Bed className="w-4 h-4" />
                  Bedrooms
                </Label>
                <Input
                  id="bedrooms"
                  type="number"
                  min="0"
                  value={formData.bedrooms}
                  onChange={(e) =>
                    updateFormData(
                      "bedrooms",
                      Number.parseInt(e.target.value) || 0
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms" className="flex items-center gap-2">
                  <Bath className="w-4 h-4" />
                  Bathrooms
                </Label>
                <Input
                  id="bathrooms"
                  type="number"
                  min="0"
                  value={formData.bathrooms}
                  onChange={(e) =>
                    updateFormData(
                      "bathrooms",
                      Number.parseInt(e.target.value) || 0
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalRooms">Total Rooms</Label>
                <Input
                  id="totalRooms"
                  type="number"
                  min="1"
                  value={formData.totalRooms}
                  onChange={(e) =>
                    updateFormData(
                      "totalRooms",
                      Number.parseInt(e.target.value) || 1
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="propertySize"
                  className="flex items-center gap-2"
                >
                  <Square className="w-4 h-4" />
                  Size (m²)
                </Label>
                <Input
                  id="propertySize"
                  type="number"
                  min="1"
                  value={formData.propertySize}
                  onChange={(e) =>
                    updateFormData(
                      "propertySize",
                      Number.parseInt(e.target.value) || 0
                    )
                  }
                  className={errors.propertySize ? "border-destructive" : ""}
                />
                {errors.propertySize && (
                  <p className="text-sm text-destructive">
                    {errors.propertySize}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="basePrice">Base Price (MAD)</Label>
              <Input
                id="basePrice"
                type="number"
                min="0"
                value={formData.basePrice}
                onChange={(e) =>
                  updateFormData(
                    "basePrice",
                    Number.parseInt(e.target.value) || 0
                  )
                }
                placeholder="500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Property Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateFormData("description", e.target.value)}
                placeholder="Describe your property, its unique features, and what makes it special..."
                rows={4}
                className={errors.description ? "border-destructive" : ""}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description}</p>
              )}
            </div>
          </div>
        );

      case 3:
       return <AmenitiesStep {...stepProps} />;

      case 4:
        return (
          <div className="w-full mx-auto lg:p-10">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Ajoutez des photos de votre propriété
                </CardTitle>
                <p className="text-center text-gray-600">
                  Des photos de haute qualité aident les voyageurs à se
                  projeter.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragging
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 bg-gray-50"
                  }`}
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
                  <p className="font-semibold mb-2">
                    Conseils pour de bonnes photos :
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Utilisez une bonne lumière naturelle.</li>
                    <li>
                      Prenez des photos de chaque pièce sous différents angles.
                    </li>
                    <li>
                      Mettez en valeur les caractéristiques uniques de votre
                      propriété.
                    </li>
                    <li>
                      Assurez-vous que les photos sont nettes et de haute
                      résolution.
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-lg font-semibold">
                  Matterport 3D Tour Scheduling
                </Label>
                <p className="text-sm text-muted-foreground">
                  Schedule a professional 3D tour of your property
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="filmingDate">Preferred Filming Date</Label>
                <Input
                  id="filmingDate"
                  type="datetime-local"
                  value={formData.filmingDate}
                  onChange={(e) =>
                    updateFormData("filmingDate", e.target.value)
                  }
                  className={errors.filmingDate ? "border-destructive" : ""}
                />
                {errors.filmingDate && (
                  <p className="text-sm text-destructive">
                    {errors.filmingDate}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="matterportUrl">
                  Existing Matterport URL (Optional)
                </Label>
                <Input
                  id="matterportUrl"
                  value={formData.matterportUrl}
                  onChange={(e) =>
                    updateFormData("matterportUrl", e.target.value)
                  }
                  placeholder="https://my.matterport.com/show/?m=..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => updateFormData("notes", e.target.value)}
                  placeholder="Any special instructions or requirements for the filming session..."
                  rows={4}
                />
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg space-y-8">
            {/* User Info */}
            <section>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Informations personnelles
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <p>
                  <strong>Prénom:</strong> {formData.firstName}
                </p>
                <p>
                  <strong>Nom:</strong> {formData.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {formData.email}
                </p>
                <p>
                  <strong>Téléphone:</strong> {formData.phone}
                </p>
              </div>
            </section>

            {/* Property Info */}
            <section>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Détails du bien
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <p>
                  <strong>Titre:</strong> {formData.title}
                </p>
                <p>
                  <strong>Type:</strong> {formData.propertyType}
                </p>
                <p>
                  <strong>Adresse:</strong> {formData.address}
                </p>
                <p>
                  <strong>Ville:</strong> {formData.city}
                </p>
                <p>
                  <strong>Pays:</strong> {formData.country}
                </p>
                <p>
                  <strong>Chambres:</strong> {formData.bedrooms}
                </p>
                <p>
                  <strong>Lits:</strong> {formData.beds}
                </p>
                <p>
                  <strong>Salles de bain:</strong> {formData.bathrooms}
                </p>
                <p>
                  <strong>Total pièces:</strong> {formData.totalRooms}
                </p>
                <p>
                  <strong>Surface:</strong> {formData.propertySize} m²
                </p>
                <p>
                  <strong>Prix de base:</strong> {formData.basePrice} MAD
                </p>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                <strong>Description:</strong> {formData.description}
              </p>
            </section>

            {/* Amenities */}
            <section>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Équipements
              </h3>
              {formData.amenities.length > 0 ? (
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {formData.amenities.map((amenity, i) => (
                    <li key={i}>{amenity}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">
                  Aucun équipement sélectionné
                </p>
              )}
            </section>

            {/* Additional Services */}
            <section>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Services supplémentaires
              </h3>
              {formData.additionalServices.length > 0 ? (
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {formData.additionalServices.map((service, i) => (
                    <li key={i}>{service}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">
                  Aucun service sélectionné
                </p>
              )}
            </section>

            {/* Images */}
            <section>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Photos
              </h3>
              {formData.images.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                  {formData.images.map((file, i) => {
                    const url = URL.createObjectURL(file);
                    return (
                      <div key={i} className="relative w-full h-40">
                        <img
                          src={url}
                          alt={`Photo ${i + 1}`}
                          className="object-cover rounded-md"
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  Aucune photo téléchargée
                </p>
              )}
            </section>

            {/* Matterport */}
            <section>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Tournage Matterport
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <strong>Date de tournage:</strong>{" "}
                  {formData.filmingDate || "Non défini"}
                </p>
                <p>
                  <strong>Lien Matterport:</strong>{" "}
                  {formData.matterportUrl || "Non défini"}
                </p>
                <p>
                  <strong>Notes:</strong> {formData.notes || "Aucune note"}
                </p>
              </div>
            </section>
          </div>
        );
      default:
        return null;
    }
  };

  if (currentStep === 0) return <WelcomeStep onNext={nextStep} />;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-background to-muted/30 pb-8 bg-cover"
      style={{ backgroundImage: 'url("/images/bg-de.png")' }}
    >
      <Header />
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">
              Step {currentStep} of {stepTitles.length}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {Math.round(getProgress())}% Complete
            </span>
          </div>
          <Progress value={getProgress()} className="h-2 text-[#E09B6B]" />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between mb-8">
          {stepTitles.map((title, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            const Icon = stepIcons[index];

            return (
              <div
                key={stepNumber}
                className="flex flex-col items-center flex-1"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                    isActive
                      ? "bg-[#244B35] text-primary-foreground"
                      : isCompleted
                      ? "bg-[#E09B6B] text-secondary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-xs text-center font-medium ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Main Form Card */}
        <Card className="shadow-lg">
          <CardHeader className="text-center"></CardHeader>
          <CardContent>{renderStep()}</CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2 bg-transparent"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {currentStep < stepTitles.length ? (
              <Button onClick={nextStep} className="flex items-center gap-2">
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={finish}
                className="bg-[#E09B6B] hover:bg-[#E09B6B]/90"
              >
                Complete Registration
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default RealEstateRegistrationForm;
