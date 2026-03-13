import Gallery from "@/components/Gallery";
import { Camera } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="pt-12 pb-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="relative animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
            <Camera size={14} />
            Curated Collection
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Photo Gallery
          </h1>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            Discover and save beautiful photography from around the world
          </p>
        </div>
      </header>
      <main className="container pb-16 px-4">
        <Gallery />
      </main>
    </div>
  );
};

export default Index;
