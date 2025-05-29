
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Calendar, 
  DollarSign, 
  Users, 
  Star,
  FileText,
  MessageSquare,
  TrendingUp
} from "lucide-react";
import Header from "@/components/Header";

const WorkshopDashboard = () => {
  const stats = [
    { title: "Ventende forespørsler", value: "12", icon: Clock, change: "+3" },
    { title: "Dagens bookinger", value: "8", icon: Calendar, change: "+2" },
    { title: "Månedsinntekt", value: "125.000 kr", icon: DollarSign, change: "+15%" },
    { title: "Aktive kunder", value: "156", icon: Users, change: "+8" },
  ];

  const recentRequests = [
    { id: 1, customer: "Ola Nordmann", service: "EU-kontroll", car: "Toyota Corolla 2020", time: "2 timer siden" },
    { id: 2, customer: "Kari Hansen", service: "Service", car: "BMW X3 2019", time: "4 timer siden" },
    { id: 3, customer: "Lars Olsen", service: "Dekkskift", car: "Audi A4 2021", time: "6 timer siden" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Oversikt over ditt verksted</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.change}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <stat.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Nye forespørsler
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{request.customer}</p>
                      <p className="text-sm text-gray-600">{request.service} - {request.car}</p>
                      <p className="text-xs text-gray-500">{request.time}</p>
                    </div>
                    <Button size="sm">Send tilbud</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Dagens program
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <div>
                    <p className="font-medium">09:00 - EU-kontroll</p>
                    <p className="text-sm text-gray-600">Volkswagen Golf - AB12345</p>
                  </div>
                  <Badge variant="secondary">Pågår</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <div>
                    <p className="font-medium">11:00 - Service</p>
                    <p className="text-sm text-gray-600">Toyota Yaris - CD67890</p>
                  </div>
                  <Badge>Venter</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                  <div>
                    <p className="font-medium">14:00 - Dekkskift</p>
                    <p className="text-sm text-gray-600">Ford Focus - EF11223</p>
                  </div>
                  <Badge variant="outline">Planlagt</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkshopDashboard;
