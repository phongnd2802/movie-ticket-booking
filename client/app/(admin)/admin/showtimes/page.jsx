"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Plus,
  Search,
  Edit,
  Trash2,
  Film,
  ChevronDown,
} from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useMovie } from "@/hooks/useMovie";
import axiosClient from "@/lib/auth/axiosClient";
import { getCinemaHall, getCinema } from "@/endpoint/auth";

// Mock data for demonstration

const mockCinemaHalls = [
  { cinemaHallId: 1, name: "Hall A" },
  { cinemaHallId: 2, name: "Hall B" },
  { cinemaHallId: 3, name: "Hall C" },
];

const mockShowtimes = [
  {
    id: 1,
    movieId: 1,
    movieName: "Inception",
    showStartTime: "2025-05-05T18:30:00",
    cinemaHallId: 1,
    cinemaHallName: "Hall A",
    seatPrices: {
      STANDARD: 10,
      PREMIUM: 15,
      VIP: 20,
    },
  },
  {
    id: 2,
    movieId: 2,
    movieName: "The Dark Knight",
    showStartTime: "2025-05-05T20:00:00",
    cinemaHallId: 2,
    cinemaHallName: "Hall B",
    seatPrices: {
      STANDARD: 12,
      PREMIUM: 18,
      VIP: 25,
    },
  },
  {
    id: 3,
    movieId: 3,
    movieName: "Interstellar",
    showStartTime: "2025-05-06T15:45:00",
    cinemaHallId: 3,
    cinemaHallName: "Hall C",
    seatPrices: {
      STANDARD: 10,
      PREMIUM: 15,
      VIP: 22,
    },
  },
];

// Enum for seat types
const SeatTypeEnum = {
  STANDARD: "STANDARD",
  PREMIUM: "PREMIUM",
  VIP: "VIP",
};

export default function ShowtimesPage() {
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentShowtime, setCurrentShowtime] = useState(null);
  const [cinemas, setCinemas] = useState([]);
  const { movies } = useMovie();
  const [formData, setFormData] = useState({
    movieId: "",
    showStartTime: "",
    cinemaHallId: "",
    seatPrices: {
      STANDARD: 10,
      PREMIUM: 15,
      VIP: 20,
    },
  });

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await axiosClient.get(getCinema);
        if (response.status === 200) {
          if (response.data.code === 20000) {
            setCinemas(response.data.metadata.cinemaHalls);
          } else {
            console.error("Failed to fetch cinemas:", response.data.message);
          }
        }
      } catch (error) {
        console.error("Failed to fetch cinemas:", error);
      }
    };
  });

  useEffect(() => {
    // Simulate API call to fetch showtimes

    const fetchShowtimes = async () => {
      try {
        setLoading(true);

        const response = await axiosClient.get(getCinemaHall);
        console.log("response in showtimes:::", response);
        if (response.status === 200) {
          if (response.data.code === 20000) {
            setShowtimes(response.data.metadata.cinemaHalls);
            setLoading(false);
          } else {
            console.error("Failed to fetch showtimes:", response.data.message);
          }
        }
      } catch (error) {
        console.error("Failed to fetch showtimes:", error);
        setLoading(false);
      }
    };

    fetchShowtimes();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredShowtimes = showtimes.filter(
    (showtime) =>
      showtime.movieName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      showtime.cinemaHallName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSeatPriceChange = (seatType, value) => {
    setFormData({
      ...formData,
      seatPrices: {
        ...formData.seatPrices,
        [seatType]: Number.parseInt(value) || 0,
      },
    });
  };

  const handleAddShowtime = () => {
    // In a real app, you would send this to your API
    const newShowtime = {
      id: showtimes.length + 1,
      movieId: Number.parseInt(formData.movieId),
      movieName: movies.find(
        (m) => m.movieId === Number.parseInt(formData.movieId)
      )?.movieName,
      showStartTime: formData.showStartTime,
      cinemaHallId: Number.parseInt(formData.cinemaHallId),
      cinemaHallName: mockCinemaHalls.find(
        (h) => h.cinemaHallId === Number.parseInt(formData.cinemaHallId)
      )?.name,
      seatPrices: formData.seatPrices,
    };

    setShowtimes([...showtimes, newShowtime]);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditShowtime = () => {
    // In a real app, you would send this to your API
    const updatedShowtimes = showtimes.map((showtime) =>
      showtime.id === currentShowtime.id
        ? {
            ...showtime,
            movieId: Number.parseInt(formData.mockMovies),
            movieName: movies.find(
              (m) => m.movieId === Number.parseInt(formData.movieId)
            )?.movieName,
            showStartTime: formData.showStartTime,
            cinemaHallId: Number.parseInt(formData.cinemaHallId),
            cinemaHallName: mockCinemaHalls.find(
              (h) => h.cinemaHallId === Number.parseInt(formData.cinemaHallId)
            )?.name,
            seatPrices: formData.seatPrices,
          }
        : showtime
    );

    setShowtimes(updatedShowtimes);
    setIsEditDialogOpen(false);
    resetForm();
  };

  const handleDeleteShowtime = () => {
    // In a real app, you would send this to your API
    const updatedShowtimes = showtimes.filter(
      (showtime) => showtime.id !== currentShowtime.id
    );

    setShowtimes(updatedShowtimes);
    setIsDeleteDialogOpen(false);
  };

  const openEditDialog = (showtime) => {
    setCurrentShowtime(showtime);
    setFormData({
      movieId: showtime.movieId.toString(),
      showStartTime: showtime.showStartTime.slice(0, 16), // Format for datetime-local input
      cinemaHallId: showtime.cinemaHallId.toString(),
      seatPrices: { ...showtime.seatPrices },
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (showtime) => {
    setCurrentShowtime(showtime);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      movieId: "",
      showStartTime: "",
      cinemaHallId: "",
      seatPrices: {
        STANDARD: 10,
        PREMIUM: 15,
        VIP: 20,
      },
    });
    setCurrentShowtime(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Showtimes</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Showtime
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Manage Showtimes</CardTitle>
          <CardDescription>
            View and manage all movie showtimes across cinema halls
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search showtimes..."
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
                    <TableHead>Movie</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>Cinema Hall</TableHead>
                    <TableHead>Seat Prices</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredShowtimes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        No showtimes found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredShowtimes.map((showtime) => (
                      <TableRow key={showtime.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Film className="h-4 w-4 text-muted-foreground" />
                            {showtime.movieName}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {formatDateTime(showtime.showStartTime)}
                          </div>
                        </TableCell>
                        <TableCell>{showtime.cinemaHallName}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {Object.entries(showtime.seatPrices).map(
                              ([type, price]) => (
                                <Badge
                                  key={type}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {type}: ${price}
                                </Badge>
                              )
                            )}
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
                                onClick={() => openEditDialog(showtime)}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => openDeleteDialog(showtime)}
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

      {/* Add Showtime Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Showtime</DialogTitle>
            <DialogDescription>
              Create a new showtime for a movie. Fill in all the required
              details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="movieId" className="text-right">
                Movie
              </Label>
              <Select
                name="movieId"
                value={formData.movieId}
                onValueChange={(value) =>
                  setFormData({ ...formData, movieId: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a movie" />
                </SelectTrigger>
                <SelectContent>
                  {movies.map((movie) => (
                    <SelectItem
                      key={movie.movieId}
                      value={movie.movieId.toString()}
                    >
                      {movie.movieName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="showStartTime" className="text-right">
                Start Time
              </Label>
              <Input
                id="showStartTime"
                name="showStartTime"
                type="datetime-local"
                value={formData.showStartTime}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cinemaHallId" className="text-right">
                Cinema Hall
              </Label>
              <Select
                name="cinemaHallId"
                value={formData.cinemaHallId}
                onValueChange={(value) =>
                  setFormData({ ...formData, cinemaHallId: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a cinema hall" />
                </SelectTrigger>
                <SelectContent>
                  {mockCinemaHalls.map((hall) => (
                    <SelectItem
                      key={hall.cinemaHallId}
                      value={hall.cinemaHallId.toString()}
                    >
                      {hall.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Seat Prices</Label>
              <div className="col-span-3 space-y-2">
                {Object.keys(SeatTypeEnum).map((seatType) => (
                  <div key={seatType} className="flex items-center gap-2">
                    <Label htmlFor={`price-${seatType}`} className="w-24">
                      {seatType}:
                    </Label>
                    <div className="flex items-center">
                      <span className="mr-1">$</span>
                      <Input
                        id={`price-${seatType}`}
                        type="number"
                        min="0"
                        value={formData.seatPrices[seatType]}
                        onChange={(e) =>
                          handleSeatPriceChange(seatType, e.target.value)
                        }
                        className="w-20"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddShowtime}>Add Showtime</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Showtime Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Showtime</DialogTitle>
            <DialogDescription>
              Update the showtime details. Make changes to the form below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="movieId" className="text-right">
                Movie
              </Label>
              <Select
                name="movieId"
                value={formData.movieId}
                onValueChange={(value) =>
                  setFormData({ ...formData, movieId: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a movie" />
                </SelectTrigger>
                <SelectContent>
                  {movies.map((movie) => (
                    <SelectItem
                      key={movie.movieId}
                      value={movie.movieId.toString()}
                    >
                      {movie.movieName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="showStartTime" className="text-right">
                Start Time
              </Label>
              <Input
                id="showStartTime"
                name="showStartTime"
                type="datetime-local"
                value={formData.showStartTime}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cinemaHallId" className="text-right">
                Cinema Hall
              </Label>
              <Select
                name="cinemaHallId"
                value={formData.cinemaHallId}
                onValueChange={(value) =>
                  setFormData({ ...formData, cinemaHallId: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a cinema hall" />
                </SelectTrigger>
                <SelectContent>
                  {mockCinemaHalls.map((hall) => (
                    <SelectItem
                      key={hall.cinemaHallId}
                      value={hall.cinemaHallId.toString()}
                    >
                      {hall.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Seat Prices</Label>
              <div className="col-span-3 space-y-2">
                {Object.keys(SeatTypeEnum).map((seatType) => (
                  <div key={seatType} className="flex items-center gap-2">
                    <Label htmlFor={`edit-price-${seatType}`} className="w-24">
                      {seatType}:
                    </Label>
                    <div className="flex items-center">
                      <span className="mr-1">$</span>
                      <Input
                        id={`edit-price-${seatType}`}
                        type="number"
                        min="0"
                        value={formData.seatPrices[seatType]}
                        onChange={(e) =>
                          handleSeatPriceChange(seatType, e.target.value)
                        }
                        className="w-20"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditShowtime}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this showtime? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentShowtime && (
              <div className="border rounded-md p-3 bg-gray-50">
                <p>
                  <strong>Movie:</strong> {currentShowtime.movieName}
                </p>
                <p>
                  <strong>Time:</strong>{" "}
                  {formatDateTime(currentShowtime.showStartTime)}
                </p>
                <p>
                  <strong>Hall:</strong> {currentShowtime.cinemaHallName}
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
            <Button variant="destructive" onClick={handleDeleteShowtime}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
