import Gallery from "@/components/Gallery";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="py-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Photo Gallery
        </h1>
        <p className="mt-2 text-muted-foreground">
          Browse and favourite beautiful photos from Unsplash
        </p>
      </header>
      <main className="container pb-16 px-4">
        <Gallery />
      </main>
    </div>
  );
};

export default Index;
