/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Trash2,
  Share2,
  MapPin,
  Bed,
  Bath,
  Square,
  ChevronUp,
  ChevronDown,
  ExternalLink,
} from "lucide-react"
import { useRouter } from "next/navigation"

// Mock data based on the Property model


type SortField = "title" | "basePrice" | "estimatedPrice" | "createdAt" | "city" | "propertySize"
type SortDirection = "asc" | "desc"

const PropertiesTable=({mockProperties}:any) =>{

  console.log(mockProperties)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortField, setSortField] = useState<SortField>("createdAt")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [selectedProperty, setSelectedProperty] = useState<any>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const router = useRouter();

  const filteredAndSortedProperties = useMemo(() => {
    const filtered = mockProperties.filter((property:any) => {
      const matchesSearch =
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.city?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesType = typeFilter === "all" || property.type === typeFilter
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && property.active) ||
        (statusFilter === "inactive" && !property.active)

      return matchesSearch && matchesType && matchesStatus
    })

    return filtered.sort((a:any, b:any) => {
      let aValue = a[sortField]
      let bValue = b[sortField]

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })
  }, [searchTerm, typeFilter, statusFilter, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
  }

  const getStatusBadge = (active: boolean, matterportStatus: string) => {
    if (!active) {
      return (
        <Badge variant="outline" className="border-gray-600 text-gray-600 bg-gray-50 hover:bg-gray-100">
          Inactive
        </Badge>
      )
    }

    switch (matterportStatus) {
      case "COMPLETED":
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">Ready</Badge>
      case "PENDING":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Processing</Badge>
      case "FAILED":
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const formatPrice = (price: number | null) => {
    if (!price) return "N/A"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-xl font-semibold">Properties Management</CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Property</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Property Title</Label>
                    <Input id="title" placeholder="Enter property title" />
                  </div>
                  <div>
                    <Label htmlFor="type">Property Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="HOUSE">House</SelectItem>
                        <SelectItem value="APARTMENT">Apartment</SelectItem>
                        <SelectItem value="CONDO">Condo</SelectItem>
                        <SelectItem value="PENTHOUSE">Penthouse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Enter full address" />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Property description" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input id="bedrooms" type="number" placeholder="0" />
                  </div>
                  <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input id="bathrooms" type="number" step="0.5" placeholder="0" />
                  </div>
                  <div>
                    <Label htmlFor="size">Size (sq ft)</Label>
                    <Input id="size" type="number" placeholder="0" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="basePrice">Base Price</Label>
                    <Input id="basePrice" type="number" placeholder="0" />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Enter city" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90">Add Property</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search properties by title, address, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[140px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="HOUSE">House</SelectItem>
                <SelectItem value="APARTMENT">Apartment</SelectItem>
                <SelectItem value="CONDO">Condo</SelectItem>
                <SelectItem value="PENTHOUSE">Penthouse</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[300px]">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("title")}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Property
                    <SortIcon field="title" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("city")}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Location
                    <SortIcon field="city" />
                  </Button>
                </TableHead>
                <TableHead>Details</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("basePrice")}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Price
                    <SortIcon field="basePrice" />
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("createdAt")}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Created
                    <SortIcon field="createdAt" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedProperties.map((property:any) => (
                <TableRow key={property.id} className="hover:bg-muted/30">
                  <TableCell>
                    <div className="flex items-center gap-3">
                     <div className="w-16 h-12 bg-cover bg-center rounded-md" style={{backgroundImage:`url("${property.images[0] || "/placeholder.png"}")`}}></div>
                      <div>
                        <div className="font-medium text-foreground">{property.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">{property.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span>{property.city}</span>
                    </div>
                    <div className="text-xs text-muted-foreground line-clamp-1">{property.address}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Bed className="h-3 w-3 text-muted-foreground" />
                        <span>{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-3 w-3 text-muted-foreground" />
                        <span>{property.bathrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Square className="h-3 w-3 text-muted-foreground" />
                        <span>{property.propertySize?.toLocaleString()} m²</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-foreground">{formatPrice(property.basePrice)}</div>
                      {property.estimatedPrice && property.estimatedPrice !== property.basePrice && (
                        <div className="text-xs text-accent">Est: {formatPrice(property.estimatedPrice)}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(property.active, property.matterportStatus)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(property.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={()=>router.push(`/fr/admin/dashboard/properties/${property.id}`)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredAndSortedProperties.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">No properties found matching your criteria.</div>
        )}
      </CardContent>

      {/* Property Details Dialog */}
      {selectedProperty && (
        <Dialog open={!!selectedProperty} onOpenChange={() => setSelectedProperty(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedProperty.title}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedProperty.images[0] || "/placeholder.svg"}
                    alt={selectedProperty.title}
                    className="w-full h-64 rounded-lg object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Property Details</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Type:</span>
                        <span className="ml-2">{selectedProperty.type}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Size:</span>
                        <span className="ml-2">{selectedProperty.propertySize?.toLocaleString()} ft²</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Bedrooms:</span>
                        <span className="ml-2">{selectedProperty.bedrooms}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Bathrooms:</span>
                        <span className="ml-2">{selectedProperty.bathrooms}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Total Rooms:</span>
                        <span className="ml-2">{selectedProperty.totalRooms}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Rating:</span>
                        <span className="ml-2">
                          {selectedProperty.aggregateRating}/5 ({selectedProperty.ratingCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Pricing</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Base Price:</span>
                        <span className="ml-2 font-medium">{formatPrice(selectedProperty.basePrice)}</span>
                      </div>
                      {selectedProperty.estimatedPrice && (
                        <div>
                          <span className="text-muted-foreground">Estimated Price:</span>
                          <span className="ml-2 font-medium text-accent">
                            {formatPrice(selectedProperty.estimatedPrice)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-sm text-muted-foreground">{selectedProperty.description}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Location</h3>
                <p className="text-sm text-muted-foreground mb-2">{selectedProperty.address}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedProperty.city}, {selectedProperty.country}
                </p>
                {selectedProperty.googleMapsUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 bg-transparent"
                    onClick={() => window.open(selectedProperty.googleMapsUrl, "_blank")}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    View on Google Maps
                  </Button>
                )}
              </div>

              <div>
                <h3 className="font-semibold mb-2">Matterport Integration</h3>
                <div className="flex items-center gap-4">
                  {getStatusBadge(selectedProperty.active, selectedProperty.matterportStatus)}
                  {selectedProperty.matterportUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(selectedProperty.matterportUrl, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View 3D Tour
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  )
}
export default PropertiesTable