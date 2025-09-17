/* eslint-disable @next/next/no-img-element */
import { getPropertyById } from "@/actions/properties";
import React from "react";

const UpdateTourPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  // ⚠️ Await params before destructuring
  const { id } = await params;
  const result = await getPropertyById(id);
  if (!result) return <div>not found</div>;

  return (
      <div className=" space-y-8">
        {/* User Info */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Informations personnelles
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <p>
              <strong>Prénom:</strong> {result.owner.name}
            </p>
            <p>
              <strong>Nom:</strong> {result.owner.prenom}
            </p>
            <p>
              <strong>Email:</strong> {result.owner.email}
            </p>
            <p>
              <strong>Téléphone:</strong> {result.owner.phone}
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
              <strong>Titre:</strong> {result.title}
            </p>
            <p>
              <strong>Type:</strong> {result.type}
            </p>
            <p>
              <strong>Adresse:</strong> {result.address}
            </p>
            <p>
              <strong>Ville:</strong> {result.city}
            </p>
            <p>
              <strong>Pays:</strong> {result.country}
            </p>
            <p>
              <strong>Chambres:</strong> {result.bedrooms}
            </p>
            <p>
              <strong>Lits:</strong> {result.beds}
            </p>
            <p>
              <strong>Salles de bain:</strong> {result.bathrooms}
            </p>
            <p>
              <strong>Total pièces:</strong> {result.totalRooms}
            </p>
            <p>
              <strong>Surface:</strong> {result.propertySize} m²
            </p>
            <p>
              <strong>Prix de base:</strong> {result.basePrice} MAD
            </p>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            <strong>Description:</strong> {result.description}
          </p>
        </section>

        {/* Images */}
      

        {/* Matterport */}
        {result.appointments.map((ap) => (
          <section key={ap.id}>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Tournage Matterport
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong>Date de tournage:</strong>{" "}
                {new Date(ap.scheduledAt).toString() || "Non défini"}
              </p>
              <p>
                <strong>Lien Matterport:</strong>{" "}
                {result.matterportUrl || "Non défini"}
              </p>
              <p>
                <strong>Notes:</strong> {ap.notes || "Aucune note"}
              </p>
            </div>
          </section>
        ))}
          <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Photos</h3>
          {result.images.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {result.images.map((file, i) => {
                return (
                  <div key={i} className="relative w-full h-40">
                    <img
                      src={file}
                      alt={`Photo ${i + 1}`}
                      className="object-cover rounded-md"
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Aucune photo téléchargée</p>
          )}
        </section>
      </div>
  );
};

export default UpdateTourPage;
