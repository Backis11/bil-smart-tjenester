
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Upload, 
  MessageSquare, 
  Search,
  Download,
  Calendar,
  Car
} from "lucide-react";
import Header from "@/components/Header";

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const dummyDocuments = [
    {
      id: 1,
      title: "EU-kontroll 2024",
      type: "EU-kontroll",
      date: "2024-03-15",
      car: "Toyota Corolla 2020",
      workshop: "Bilverkstedet AS",
      status: "Godkjent",
      fileSize: "245 KB"
    },
    {
      id: 2,
      title: "Service rapport - 60 000 km",
      type: "Service",
      date: "2024-02-10",
      car: "Toyota Corolla 2020",
      workshop: "Toyota Bergen",
      status: "Fullført",
      fileSize: "512 KB"
    },
    {
      id: 3,
      title: "Dekkskift vinter 2023",
      type: "Dekkskift",
      date: "2023-11-20",
      car: "Toyota Corolla 2020",
      workshop: "Dekk & Felg Senteret",
      status: "Fullført",
      fileSize: "89 KB"
    },
    {
      id: 4,
      title: "Forsikringspapirer",
      type: "Forsikring",
      date: "2024-01-01",
      car: "Toyota Corolla 2020",
      workshop: "If Skadeforsikring",
      status: "Aktiv",
      fileSize: "156 KB"
    }
  ];

  const filteredDocuments = dummyDocuments.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.workshop.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Godkjent":
      case "Fullført":
      case "Aktiv":
        return "bg-green-100 text-green-800";
      case "Avvist":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Mine dokumenter</h1>
          
          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 mb-6">
            <Button className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Last opp dokumentasjon</span>
            </Button>
            
            <Button variant="outline" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Forespør dokumentasjon fra verksted</span>
            </Button>
          </div>
          
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Søk i dokumenter..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-gray-900 placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Documents grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((document) => (
            <Card key={document.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-lg line-clamp-1">{document.title}</CardTitle>
                  </div>
                  <Badge className={getStatusColor(document.status)}>
                    {document.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Car className="h-4 w-4 mr-2" />
                    <span>{document.car}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(document.date).toLocaleDateString('no-NO')}</span>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <p><span className="font-medium">Verksted:</span> {document.workshop}</p>
                    <p><span className="font-medium">Type:</span> {document.type}</p>
                    <p><span className="font-medium">Størrelse:</span> {document.fileSize}</p>
                  </div>
                  
                  <div className="pt-2">
                    <Button size="sm" variant="outline" className="w-full flex items-center space-x-2">
                      <Download className="h-4 w-4" />
                      <span>Last ned</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen dokumenter funnet</h3>
            <p className="text-gray-600">Prøv å justere søket ditt eller last opp nye dokumenter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;
