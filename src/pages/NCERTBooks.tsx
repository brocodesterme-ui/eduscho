import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import NCERTBookCard from "@/components/NCERTBookCard";
import { getBooksByClass } from "@/data/ncertBooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const NCERTBooks = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const booksByClass = getBooksByClass();
  const classes = Object.keys(booksByClass).sort((a, b) => Number(a) - Number(b));

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (!user) {
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="p-8">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">NCERT Books</h1>
                <p className="text-muted-foreground">
                  Access official NCERT textbooks for Classes 9-12
                </p>
              </div>
            </div>
            <Button variant="outline" asChild className="mt-4">
              <a href="https://ncert.nic.in/textbook.php" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Visit Official NCERT Website
              </a>
            </Button>
          </div>

          {/* Books by Class */}
          <Tabs defaultValue={classes[0]} className="w-full">
            <TabsList className="flex flex-wrap h-auto gap-1 mb-6">
              {classes.map((className) => (
                <TabsTrigger key={className} value={className} className="px-4">
                  Class {className}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {classes.map((className) => (
              <TabsContent key={className} value={className}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {booksByClass[className].map((book) => (
                    <NCERTBookCard
                      key={book.id}
                      className={book.className}
                      subject={book.subject}
                      chapters={book.chapters}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default NCERTBooks;
