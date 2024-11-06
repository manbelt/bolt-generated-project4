"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash, MapPin, Phone, Globe } from "lucide-react"

export function BusinessListings() {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null)

  const businesses = [
    {
      id: 1,
      name: "Restaurant Example",
      address: "123 Main St, Jávea",
      phone: "+34 123 456 789",
      website: "https://example.com",
      category: "Restaurant",
      status: "Verified",
    },
    // Add more example businesses
  ]

  const handleAddBusiness = (formData: FormData) => {
    // Handle adding business logic
    setShowAddDialog(false)
  }

  const handleEditBusiness = (formData: FormData) => {
    // Handle editing business logic
    setShowEditDialog(false)
  }

  const BusinessForm = ({ onSubmit, initialData = null }: any) => (
    <form action={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Business Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={initialData?.name}
          required
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          name="category"
          defaultValue={initialData?.category}
          required
        />
      </div>
      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          defaultValue={initialData?.address}
          required
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          defaultValue={initialData?.phone}
          required
        />
      </div>
      <div>
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          name="website"
          type="url"
          defaultValue={initialData?.website}
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={initialData?.description}
        />
      </div>
      <Button type="submit" className="w-full">
        {initialData ? "Update Business" : "Add Business"}
      </Button>
    </form>
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Your Businesses</h2>
          <p className="text-muted-foreground">
            Manage your business listings and information
          </p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Business
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Business</DialogTitle>
              <DialogDescription>
                Add your business details to create a new listing
              </DialogDescription>
            </DialogHeader>
            <BusinessForm onSubmit={handleAddBusiness} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {businesses.map((business) => (
          <Card key={business.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{business.name}</CardTitle>
                  <CardDescription>{business.category}</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setSelectedBusiness(business)
                      setShowEditDialog(true)
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4" />
                  {business.address}
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="mr-2 h-4 w-4" />
                  {business.phone}
                </div>
                {business.website && (
                  <div className="flex items-center text-sm">
                    <Globe className="mr-2 h-4 w-4" />
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {business.website}
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Business</DialogTitle>
            <DialogDescription>
              Update your business information
            </DialogDescription>
          </DialogHeader>
          <BusinessForm
            onSubmit={handleEditBusiness}
            initialData={selectedBusiness}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
