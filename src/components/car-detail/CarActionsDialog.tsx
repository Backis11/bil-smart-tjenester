
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle, Trash2, DollarSign, UserCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface CarActionsDialogProps {
  carId: string;
  carMake: string;
  carModel: string;
  onCarUpdated: () => void;
}

const CarActionsDialog = ({ carId, carMake, carModel, onCarUpdated }: CarActionsDialogProps) => {
  const [showSoldForm, setShowSoldForm] = useState(false);
  const [showTransferForm, setShowTransferForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [transferTo, setTransferTo] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSoldCar = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('cars')
        .update({
          status: 'sold',
          sold_at: new Date().toISOString(),
          notes: notes.trim() || null
        })
        .eq('id', carId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Bil markert som solgt",
        description: `${carMake} ${carModel} er nå markert som solgt.`,
      });
      
      onCarUpdated();
      setShowSoldForm(false);
      setNotes('');
    } catch (error) {
      console.error('Error marking car as sold:', error);
      toast({
        title: "Feil",
        description: "Kunne ikke markere bil som solgt",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTransferCar = async () => {
    if (!user || !transferTo.trim()) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('cars')
        .update({
          status: 'transferred',
          transferred_at: new Date().toISOString(),
          transferred_to: transferTo.trim(),
          notes: notes.trim() || null
        })
        .eq('id', carId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Eierskap overført",
        description: `${carMake} ${carModel} er overført til ${transferTo}.`,
      });
      
      onCarUpdated();
      setShowTransferForm(false);
      setTransferTo('');
      setNotes('');
    } catch (error) {
      console.error('Error transferring car:', error);
      toast({
        title: "Feil",
        description: "Kunne ikke overføre eierskap",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCar = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('cars')
        .update({
          status: 'deleted'
        })
        .eq('id', carId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Bil slettet",
        description: `${carMake} ${carModel} er slettet fra din profil.`,
      });
      
      onCarUpdated();
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Error deleting car:', error);
      toast({
        title: "Feil",
        description: "Kunne ikke slette bil",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (showSoldForm) {
    return (
      <Card className="border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center text-amber-700">
            <DollarSign className="h-5 w-5 mr-2" />
            Marker som solgt
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="sold-notes">Notater (valgfritt)</Label>
            <Textarea
              id="sold-notes"
              placeholder="Legg til notater om salget..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleSoldCar} 
              disabled={loading}
              className="bg-amber-600 hover:bg-amber-700"
            >
              {loading ? 'Markerer...' : 'Marker som solgt'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowSoldForm(false);
                setNotes('');
              }}
            >
              Avbryt
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showTransferForm) {
    return (
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-700">
            <UserCheck className="h-5 w-5 mr-2" />
            Overfør eierskap
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="transfer-to">Overfør til *</Label>
            <Input
              id="transfer-to"
              placeholder="Navn på ny eier"
              value={transferTo}
              onChange={(e) => setTransferTo(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="transfer-notes">Notater (valgfritt)</Label>
            <Textarea
              id="transfer-notes"
              placeholder="Legg til notater om overføringen..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleTransferCar} 
              disabled={loading || !transferTo.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? 'Overfører...' : 'Overfør eierskap'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowTransferForm(false);
                setTransferTo('');
                setNotes('');
              }}
            >
              Avbryt
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showDeleteConfirm) {
    return (
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center text-red-700">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Bekreft sletting
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Er du sikker på at du vil slette <strong>{carMake} {carModel}</strong>? 
            Denne handlingen kan ikke angres.
          </p>
          <div className="flex gap-2">
            <Button 
              onClick={handleDeleteCar} 
              disabled={loading}
              variant="destructive"
            >
              {loading ? 'Sletter...' : 'Slett bil'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowDeleteConfirm(false)}
            >
              Avbryt
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bil-handlinger</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          onClick={() => setShowSoldForm(true)} 
          variant="outline" 
          className="w-full justify-start"
        >
          <DollarSign className="h-4 w-4 mr-2" />
          Marker som solgt
        </Button>
        
        <Button 
          onClick={() => setShowTransferForm(true)} 
          variant="outline" 
          className="w-full justify-start"
        >
          <UserCheck className="h-4 w-4 mr-2" />
          Overfør eierskap
        </Button>
        
        <Button 
          onClick={() => setShowDeleteConfirm(true)} 
          variant="outline" 
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Slett bil
        </Button>
      </CardContent>
    </Card>
  );
};

export default CarActionsDialog;
