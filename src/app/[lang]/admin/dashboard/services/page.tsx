/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useEffect, useMemo, useState, useTransition } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-toastify";
import * as LucideIcons from "lucide-react";

// NOTE: Replace these imports with your real server actions in the next step
// (I'll provide implementations in /actions in my next message.)
import {
  // Amenity & Category actions (to be implemented server-side)
  listAmenityCategories,
  createAmenityCategory,
  updateAmenityCategory,
  deleteAmenityCategory,
  listAmenities,
  createAmenity,
  updateAmenity,
  deleteAmenity,
} from "@/actions/amenities";
import {
  // Additional Service actions (to be implemented server-side)
  listServices,
  createService,
  updateService,
  deleteService,
} from "@/actions/services";

// ---------- Types (mirror Prisma models) ----------
export type AmenityCategory = { id: string; name: string };
export type Amenity = {
  id: string;
  name: string;
  icon?: string | null;
  categoryId: string;
  category?: AmenityCategory;
};
export type AdditionalService = { id: string; name: string; icon?: string | null };

// ---------- Utilities ----------
function IconPreview({ name, className }: { name?: string | null; className?: string }) {
  const map = useMemo(() => ({ ...LucideIcons }), []);

  const Cmp: any = name && (map as any)[name as keyof typeof map];
  return Cmp ? <Cmp className={className ?? "h-4 w-4"} /> : <LucideIcons.Shapes className={className ?? "h-4 w-4"} />;
}

// ---------- Category Dialog ----------
function CategoryDialog({
  open,
  onOpenChange,
  initial,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial?: Partial<AmenityCategory>;
  onSubmit: (values: { name: string; id?: string }) => Promise<void>;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const isEdit = Boolean(initial?.id);

  useEffect(() => {
    setName(initial?.name ?? "");
  }, [initial]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Modifier la catégorie" : "Nouvelle catégorie"}</DialogTitle>
          <DialogDescription>Regroupez vos équipements par catégorie.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Nom</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Essentiels" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>Annuler</Button>
          <Button
            onClick={async () => {
              if (!name.trim()) return toast.error("Le nom est requis");
              await onSubmit({ id: initial?.id, name: name.trim() });
              onOpenChange(false);
            }}
          >{isEdit ? "Enregistrer" : "Créer"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ---------- Amenity Dialog ----------
function AmenityDialog({
  open,
  onOpenChange,
  initial,
  categories,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial?: Partial<Amenity>;
  categories: AmenityCategory[];
  onSubmit: (values: { id?: string; name: string; icon?: string; categoryId: string }) => Promise<void>;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [icon, setIcon] = useState(initial?.icon ?? "");
  const [categoryId, setCategoryId] = useState(initial?.categoryId ?? categories[0]?.id ?? "");
  const isEdit = Boolean(initial?.id);

  useEffect(() => {
    setName(initial?.name ?? "");
    setIcon(initial?.icon ?? "");
    setCategoryId(initial?.categoryId ?? categories[0]?.id ?? "");
  }, [initial, categories]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Modifier l'équipement" : "Nouvel équipement"}</DialogTitle>
          <DialogDescription>Ajoutez un équipement sélectionnable par les hôtes.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Nom</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Wi‑Fi" />
          </div>
          <div className="space-y-2">
            <Label>Icône (nom Lucide)</Label>
            <div className="flex items-center gap-2">
              <Input value={icon ?? ""} onChange={(e) => setIcon(e.target.value)} placeholder="Ex: Wifi" />
              <IconPreview name={icon} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Catégorie</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>Annuler</Button>
          <Button
            onClick={async () => {
              if (!name.trim()) return toast.error("Le nom est requis");
              if (!categoryId) return toast.error("La catégorie est requise");
              await onSubmit({ id: initial?.id, name: name.trim(), icon: icon || undefined, categoryId });
              onOpenChange(false);
            }}
          >{isEdit ? "Enregistrer" : "Créer"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ---------- Service Dialog ----------
function ServiceDialog({
  open,
  onOpenChange,
  initial,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial?: Partial<AdditionalService>;
  onSubmit: (values: { id?: string; name: string; icon?: string }) => Promise<void>;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [icon, setIcon] = useState(initial?.icon ?? "");
  const isEdit = Boolean(initial?.id);

  useEffect(() => {
    setName(initial?.name ?? "");
    setIcon(initial?.icon ?? "");
  }, [initial]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">

        <DialogHeader>
          <DialogTitle>{isEdit ? "Modifier le service" : "Nouveau service"}</DialogTitle>
          <DialogDescription>Services additionnels proposés aux voyageurs.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Nom</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Petit‑déjeuner" />
          </div>
          <div className="space-y-2">
            <Label>Icône (nom Lucide)</Label>
            <div className="flex items-center gap-2">
              <Input value={icon ?? ""} onChange={(e) => setIcon(e.target.value)} placeholder="Ex: Coffee" />
              <IconPreview name={icon} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>Annuler</Button>
          <Button
            onClick={async () => {
              if (!name.trim()) return toast.error("Le nom est requis");
              await onSubmit({ id: initial?.id, name: name.trim(), icon: icon || undefined });
              onOpenChange(false);
            }}
          >{isEdit ? "Enregistrer" : "Créer"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ---------- Amenity Manager (list + actions) ----------
function AmenitiesPanel() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState("");

  const [categories, setCategories] = useState<AmenityCategory[]>([]);
  const [amenities, setAmenities] = useState<Amenity[]>([]);

  const [catDialogOpen, setCatDialogOpen] = useState(false);
  const [catEditing, setCatEditing] = useState<AmenityCategory | undefined>(undefined);

  const [amenityDialogOpen, setAmenityDialogOpen] = useState(false);
  const [amenityEditing, setAmenityEditing] = useState<Amenity | undefined>(undefined);

  const load = async () => {
    try {
      const [cats, ams] = await Promise.all([
        listAmenityCategories(),
        listAmenities(),
      ]);
      setCategories(cats);
      setAmenities(ams);
    } catch (e: any) {
      toast.error(e?.message ?? "Erreur de chargement");
    }
  };

  useEffect(() => {
    startTransition(load);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return amenities
      .filter((a) => !q || a.name.toLowerCase().includes(q))
      .sort((a, b) => (a.category?.name || "").localeCompare(b.category?.name || ""));
  }, [amenities, query]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle className="text-lg">Équipements</CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative">
            <LucideIcons.Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
            <Input className="pl-8 w-56" placeholder="Rechercher..." value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <Button variant="outline" onClick={() => startTransition(load)} disabled={isPending}>
            <LucideIcons.RefreshCw className="h-4 w-4 mr-2" /> Rafraîchir
          </Button>
          
            <Button onClick={() => { setCatEditing(undefined); setCatDialogOpen(true); }}>
              <LucideIcons.Plus className="h-4 w-4 mr-2" /> Catégorie
            </Button>
         
            <Button onClick={() => { setAmenityEditing(undefined); setAmenityDialogOpen(true); }}>
              <LucideIcons.Plus className="h-4 w-4 mr-2" /> Équipement
            </Button>
          
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((a) => (
            <div key={a.id} className="border rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <IconPreview name={a.icon} className="h-5 w-5" />
                <div>
                  <div className="font-medium">{a.name}</div>
                  <div className="text-xs text-muted-foreground">{a.category?.name}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost" onClick={() => { setAmenityEditing(a); setAmenityDialogOpen(true); }}>
                  <LucideIcons.Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={async () => {
                    if (!confirm(`Supprimer "${a.name}" ?`)) return;
                    await deleteAmenity(a.id);
                    toast.success("Équipement supprimé");
                    startTransition(load);
                  }}
                >
                  <LucideIcons.Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-6" />

        <div>
          <h4 className="text-sm font-semibold mb-3">Catégories</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <div key={c.id} className="px-3 py-1 rounded-full border flex items-center gap-2">
                <span className="text-sm">{c.name}</span>
                <button
                  className="p-1 hover:bg-accent rounded"
                  onClick={() => { setCatEditing(c); setCatDialogOpen(true); }}
                  title="Modifier"
                >
                  <LucideIcons.Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  className="p-1 hover:bg-accent rounded"
                  onClick={async () => {
                    if (!confirm(`Supprimer la catégorie "${c.name}" ?`)) return;
                    await deleteAmenityCategory(c.id);
                    toast.success("Catégorie supprimée");
                    startTransition(load);
                  }}
                  title="Supprimer"
                >
                  <LucideIcons.Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      {/* Dialogs */}
      <CategoryDialog
        open={catDialogOpen}
        onOpenChange={setCatDialogOpen}
        initial={catEditing}
        onSubmit={async ({ id, name }) => {
          if (id) {
            await updateAmenityCategory( id, name );
            toast.success("Catégorie mise à jour");
          } else {
            await createAmenityCategory( name );
            toast.success("Catégorie créée");
          }
          startTransition(load);
        }}
      />

      <AmenityDialog
        open={amenityDialogOpen}
        onOpenChange={setAmenityDialogOpen}
        initial={amenityEditing}
        categories={categories}
        onSubmit={async (payload) => {
          if (payload.id) {
            await updateAmenity(payload.id,payload);
            toast.success("Équipement mis à jour");
          } else {
            await createAmenity(payload.name,payload.icon || "",payload.categoryId);
            toast.success("Équipement créé");
          }
          startTransition(load);
        }}
      />
    </Card>
  );
}

// ---------- Services Manager ----------
function ServicesPanel() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const [services, setServices] = useState<AdditionalService[]>([]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<AdditionalService | undefined>(undefined);

  const load = async () => {
    try {
      const list = await listServices();
      setServices(list);
    } catch (e: any) {
      toast.error(e?.message ?? "Erreur de chargement");
    }
  };

  useEffect(() => {
    startTransition(load);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter((s) => !q || s.name.toLowerCase().includes(q));
  }, [services, query]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle className="text-lg">Services additionnels</CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative">
            <LucideIcons.Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
            <Input className="pl-8 w-56" placeholder="Rechercher..." value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <Button variant="outline" onClick={() => startTransition(load)} disabled={isPending}>
            <LucideIcons.RefreshCw className="h-4 w-4 mr-2" /> Rafraîchir
          </Button>
         
            <Button onClick={() => { setEditing(undefined); setDialogOpen(true); }}>
              <LucideIcons.Plus className="h-4 w-4 mr-2" /> Nouveau
            </Button>
          
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((s) => (
            <div key={s.id} className="border rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <IconPreview name={s.icon} className="h-5 w-5" />
                <div className="font-medium">{s.name}</div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost" onClick={() => { setEditing(s); setDialogOpen(true); }}>
                  <LucideIcons.Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={async () => {
                    if (!confirm(`Supprimer "${s.name}" ?`)) return;
                    await deleteService(s.id);
                    toast.success("Service supprimé");
                    startTransition(load);
                  }}
                >
                  <LucideIcons.Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <ServiceDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initial={editing}
        onSubmit={async (payload) => {
          if (payload.id) {
            await updateService(payload.id,payload);
            toast.success("Service mis à jour");
          } else {
            await createService(payload.name,payload.icon ||"");
            toast.success("Service créé");
          }
          startTransition(load);
        }}
      />
    </Card>
  );
}

// ---------- Page Wrapper ----------
export default function AmenitiesServicesManager() {
  return (
    <div className="container max-w-6xl mx-auto  space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Gestion des équipements & services</h1>
      </div>
      <Tabs defaultValue="amenities">
        <TabsList>
          <TabsTrigger value="amenities">Équipements</TabsTrigger>
          <TabsTrigger value="services">Services additionnels</TabsTrigger>
        </TabsList>
        <div className="mt-4 space-y-4">
          <TabsContent value="amenities" className="space-y-4">
            <AmenitiesPanel />
          </TabsContent>
          <TabsContent value="services" className="space-y-4">
            <ServicesPanel />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
