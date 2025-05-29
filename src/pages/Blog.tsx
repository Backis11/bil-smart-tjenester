
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "5 tegn på at bilen din trenger service",
      excerpt: "Lær å gjenkjenne de viktigste varselsignalene som kan spare deg for dyre reparasjoner senere.",
      author: "Wrench Redaksjon",
      date: "15. desember 2024",
      category: "Service",
      readTime: "3 min"
    },
    {
      id: 2,
      title: "Alt du trenger å vite om EU-kontroll",
      excerpt: "En komplett guide til EU-kontroll - hva som sjekkes, kostnader og hvordan du forbereder deg.",
      author: "Wrench Redaksjon", 
      date: "10. desember 2024",
      category: "EU-kontroll",
      readTime: "5 min"
    },
    {
      id: 3,
      title: "Hvordan få best mulig pris når du selger bilen",
      excerpt: "Tips og triks for å maksimere verdien på bilen din når det er tid for salg.",
      author: "Wrench Redaksjon",
      date: "5. desember 2024", 
      category: "Salg",
      readTime: "4 min"
    },
    {
      id: 4,
      title: "Vinterdekk vs. piggdekk - hva er best?",
      excerpt: "En sammenligning av ulike dekkalternativer for vintersesongen.",
      author: "Wrench Redaksjon",
      date: "1. desember 2024",
      category: "Dekk",
      readTime: "6 min"
    }
  ];

  const categories = ["Alle", "Service", "EU-kontroll", "Salg", "Dekk"];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Wrench Blogg
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tips, råd og nyheter om bilhold og vedlikehold
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category) => (
            <Badge 
              key={category} 
              variant={category === "Alle" ? "default" : "outline"}
              className="cursor-pointer hover:bg-blue-50"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            Flere artikler kommer snart. Følg med for de nyeste tipsene og rådene!
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
