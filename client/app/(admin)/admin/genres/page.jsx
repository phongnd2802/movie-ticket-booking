"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, Tag, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import axiosClient from "@/lib/auth/axiosClient";
import { addGenre } from "@/endpoint/auth";

// Mock data for demonstration
const mockGenres = [
  { id: 1, genre: "Action" },
  { id: 2, genre: "Comedy" },
  { id: 3, genre: "Drama" },
  { id: 4, genre: "Horror" },
  { id: 5, genre: "Science Fiction" },
  { id: 6, genre: "Romance" },
  { id: 7, genre: "Thriller" },
  { id: 8, genre: "Animation" },
];

export default function GenresPage() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentGenre, setCurrentGenre] = useState(null);
  const [formData, setFormData] = useState({
    genre: "",
  });

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch from your API
        // const response = await fetch('/api/genres');
        // const data = await response.json();

        // Using mock data for demonstration
        setTimeout(() => {
          setGenres(mockGenres);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredGenres = genres.filter((genre) =>
    genre.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddGenre = async () => {
    try {
      const newGenre = {
        genre: formData.genre,
      };
      console.log("newGenre", newGenre);
      const response = await axiosClient.post(addGenre, newGenre);
      console.log(response);
      if (response.status === 200) {
        if (response.data.code === 20000) {
          setGenres([...genres, newGenre]);
          setIsAddDialogOpen(false);
          resetForm();
        }
      }
    } catch (error) {
      console.error("Failed to add genre:", error);
      if (error.response?.data?.errors) {
      } else {
        console.error("Failed to add genre. Please try again.");
      }
    }
  };

  const handleEditGenre = () => {
    const updatedGenres = genres.map((genre) =>
      genre.id === currentGenre.id
        ? {
            ...genre,
            genre: formData.genre,
          }
        : genre
    );

    setGenres(updatedGenres);
    setIsEditDialogOpen(false);
    resetForm();
  };

  const handleDeleteGenre = () => {
    const updatedGenres = genres.filter(
      (genre) => genre.id !== currentGenre.id
    );

    setGenres(updatedGenres);
    setIsDeleteDialogOpen(false);
  };

  const openEditDialog = (genre) => {
    setCurrentGenre(genre);
    setFormData({
      genre: genre.genre,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (genre) => {
    setCurrentGenre(genre);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      genre: "",
    });
    setCurrentGenre(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Genres</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Genre
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Manage Genres</CardTitle>
          <CardDescription>View and manage all movie genres</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search genres..."
                className="pl-8"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {loading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-12 bg-gray-100 animate-pulse rounded-md"
                />
              ))}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Genre</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGenres.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center py-4">
                        No genres found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredGenres.map((genre) => (
                      <TableRow key={genre.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4 text-muted-foreground" />
                            {genre.genre}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <ChevronDown className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => openEditDialog(genre)}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => openDeleteDialog(genre)}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Genre Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Genre</DialogTitle>
            <DialogDescription>
              Create a new movie genre. Enter the genre name below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="genre" className="text-right">
                Genre Name
              </Label>
              <Input
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="e.g., Action, Comedy, Drama"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddGenre} disabled={!formData.genre.trim()}>
              Add Genre
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Genre Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Genre</DialogTitle>
            <DialogDescription>
              Update the genre name. Make changes to the form below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-genre" className="text-right">
                Genre Name
              </Label>
              <Input
                id="edit-genre"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditGenre} disabled={!formData.genre.trim()}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this genre? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentGenre && (
              <div className="border rounded-md p-3 bg-gray-50">
                <p>
                  <strong>Genre:</strong> {currentGenre.genre}
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteGenre}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
