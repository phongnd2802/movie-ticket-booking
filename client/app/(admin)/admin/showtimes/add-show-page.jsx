"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosClient from "@/lib/auth/axiosClient";
import { useMovie } from "@/hooks/useMovie";

// Enum for seat types as specified
const SeatTypeEnum = {
  STANDARD: "STANDARD",
  COUPLE: "COUPLE",
};

export default function AddShowComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [cinemas, setCinemas] = useState([]);
  const [cinemaHalls, setCinemaHalls] = useState([]);
  const [filteredHalls, setFilteredHalls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    movieId: "",
    showStartTime: "",
    cinemaId: "",
    cinemaHallId: "",
    seatPrices: {
      STANDARD: 10,
      COUPLE: 15,
    },
  });
  const { movies } = useMovie();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const cinemasResponse = await axiosClient.get("/api/cinemas");
        const hallsResponse = await axiosClient.get("/api/cinema-halls");

        if (cinemasResponse.status === 200 && hallsResponse.status === 200) {
          setCinemas(cinemasResponse.data.metadata.cinemas || []);
          setCinemaHalls(hallsResponse.data.metadata.cinemaHalls || []);
        }

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (formData.cinemaId) {
      const halls = cinemaHalls.filter(
        (hall) => hall.cinemaId.toString() === formData.cinemaId
      );
      setFilteredHalls(halls);

      if (
        formData.cinemaHallId &&
        !halls.some(
          (hall) => hall.cinemaHallId.toString() === formData.cinemaHallId
        )
      ) {
        setFormData((prev) => ({
          ...prev,
          cinemaHallId: "",
        }));
      }
    } else {
      setFilteredHalls([]);
      setFormData((prev) => ({
        ...prev,
        cinemaHallId: "",
      }));
    }
  }, [formData.cinemaId, cinemaHalls]);

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

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const showData = {
        movieId: Number.parseInt(formData.movieId),
        showStartTime: formData.showStartTime,
        cinemaHallId: Number.parseInt(formData.cinemaHallId),
        seatPrices: formData.seatPrices,
      };

      const response = await axiosClient.post("/api/shows", showData);

      if (response.status === 200 || response.status === 201) {
        setIsOpen(false);
        resetForm();
      } else {
        console.error("Failed to add show:", response.data.message);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error adding show:", error);
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      movieId: "",
      showStartTime: "",
      cinemaId: "",
      cinemaHallId: "",
      seatPrices: {
        STANDARD: 10,
        COUPLE: 15,
      },
    });
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Plus className="mr-2 h-4 w-4" /> Add Show
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Show</DialogTitle>
            <DialogDescription>
              Create a new show for a movie. Fill in all the required details.
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
              <Label htmlFor="cinemaId" className="text-right">
                Cinema
              </Label>
              <Select
                name="cinemaId"
                value={formData.cinemaId}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    cinemaId: value,
                    cinemaHallId: "",
                  })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a cinema" />
                </SelectTrigger>
                <SelectContent>
                  {cinemas.map((cinema) => (
                    <SelectItem
                      key={cinema.cinemaId}
                      value={cinema.cinemaId.toString()}
                    >
                      {cinema.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                disabled={!formData.cinemaId}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue
                    placeholder={
                      formData.cinemaId
                        ? "Select a hall"
                        : "Select a cinema first"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {filteredHalls.length > 0 ? (
                    filteredHalls.map((hall) => (
                      <SelectItem
                        key={hall.cinemaHallId}
                        value={hall.cinemaHallId.toString()}
                      >
                        {hall.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-halls" disabled>
                      {formData.cinemaId
                        ? "No halls available"
                        : "Select a cinema first"}
                    </SelectItem>
                  )}
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
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={
                loading ||
                !formData.movieId ||
                !formData.showStartTime ||
                !formData.cinemaHallId
              }
            >
              {loading ? "Adding..." : "Add Show"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
