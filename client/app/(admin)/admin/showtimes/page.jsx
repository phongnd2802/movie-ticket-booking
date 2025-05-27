"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddShowComponent from "./add-show-page";

export default function AddShowPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Movie Shows Management</h1>
        <AddShowComponent />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Show</CardTitle>
          <CardDescription>
            Create new showtimes for movies with custom seat pricing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Use the "Add Show" button above to create a new movie showtime. You
            can set:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
            <li>Movie selection</li>
            <li>Show start time</li>
            <li>Cinema hall assignment</li>
            <li>Pricing for different seat types (Standard and Couple)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
