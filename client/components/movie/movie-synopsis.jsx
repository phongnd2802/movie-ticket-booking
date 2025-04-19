export function MovieSynopsis({ description, releaseInfo }) {
  // Add null checks to prevent errors
  if (!description || !releaseInfo) {
    return (
      <div className="mt-12 border-t pt-8">
        <div className="flex items-center">
          <div className="h-6 w-1 bg-primary"></div>
          <h2 className="ml-2 text-xl font-bold tracking-tight">
            Nội Dung Phim
          </h2>
        </div>
        <div className="mt-4 text-muted-foreground">
          <p className="leading-relaxed">Loading movie description...</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch (e) {
      return "Coming soon";
    }
  };

  return (
    <div className="mt-12 border-t pt-8">
      <div className="flex items-center">
        <div className="h-6 w-1 bg-primary"></div>
        <h2 className="ml-2 text-xl font-bold tracking-tight">Nội Dung Phim</h2>
      </div>
      <div className="mt-4 text-muted-foreground">
        <p className="leading-relaxed">{description}</p>
      </div>
      <div className="mt-4 text-sm">
        <span className="font-medium">Phim mới</span> ▲ {releaseInfo.movieName}{" "}
        suất chiếu sớm{" "}
        {releaseInfo.movieReleaseDate
          ? formatDate(releaseInfo.movieReleaseDate)
              .split("/")
              .slice(0, 2)
              .join("/")
          : ""}{" "}
        (Không áp dụng Movie Voucher), dự kiến khởi chiếu{" "}
        {releaseInfo.movieReleaseDate
          ? formatDate(releaseInfo.movieReleaseDate)
          : ""}{" "}
        tại các <span className="text-primary">rạp chiếu phim</span> toàn quốc.
      </div>
    </div>
  );
}
