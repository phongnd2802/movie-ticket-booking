import Image from "next/image";
import { Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function CastModal({ open, onOpenChange, actor }) {
  if (!actor) return null;

  const formatBirthDate = (dateString) => {
    if (!dateString) return "Unknown";

    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const birthDate = actor.actorBirthDate
    ? formatBirthDate(actor.actorBirthDate)
    : "Unknown";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <div className="grid gap-6 md:grid-cols-[200px_1fr]">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
            <Image
              src={actor.actorImage || "/placeholder.svg?height=400&width=300"}
              alt={actor.actorName}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold">{actor.actorName}</h2>
              <p className="text-muted-foreground">as {actor.character}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Born: {birthDate}
              </p>
            </div>

            <Tabs defaultValue="bio" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="bio">Biography</TabsTrigger>
                <TabsTrigger value="films">Filmography</TabsTrigger>
                <TabsTrigger value="awards">Awards</TabsTrigger>
              </TabsList>
              <TabsContent value="bio" className="mt-4">
                <p>{actor.bio}</p>
              </TabsContent>
              <TabsContent value="films" className="mt-4">
                {actor.films && actor.films.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {actor.films.map((film) => (
                      <FilmCard key={film.filmId} film={film} />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No filmography available
                  </p>
                )}
              </TabsContent>
              <TabsContent value="awards" className="mt-4">
                {actor.awards && actor.awards.length > 0 ? (
                  <ul className="space-y-2">
                    {actor.awards.map((award, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-yellow-400"></div>
                        {award}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No awards available</p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FilmCard({ film }) {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
        <Image
          src={film.posterImage || "/placeholder.svg?height=300&width=200"}
          alt={film.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold text-white">{film.rating}</span>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <h3 className="text-sm font-medium line-clamp-1">{film.title}</h3>
        <p className="text-xs text-muted-foreground">{film.releaseYear}</p>
      </div>
    </div>
  );
}
