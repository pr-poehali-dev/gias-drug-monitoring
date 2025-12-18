import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import DashboardTab from '@/components/DashboardTab';
import MapTab from '@/components/MapTab';
import ReportsTab from '@/components/ReportsTab';
import PlanningTab from '@/components/PlanningTab';

export default function Index() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedDocType, setSelectedDocType] = useState('analytical');

  const getRiskBadge = (risk: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      high: { variant: 'destructive', label: 'Высокий' },
      medium: { variant: 'default', label: 'Средний' },
      low: { variant: 'secondary', label: 'Низкий' }
    };
    const config = variants[risk];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Icon name="Scale" size={32} className="text-accent" />
              <div>
                <h1 className="text-2xl font-bold">ГИАС Прокурорского Надзора</h1>
                <p className="text-sm opacity-90">Мониторинг законности в сфере оборота наркотиков</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                <Icon name="User" size={14} className="mr-1" />
                Иванов И.П.
              </Badge>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Icon name="Settings" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="dashboard" className="gap-2">
              <Icon name="LayoutDashboard" size={16} />
              <span className="hidden sm:inline">Мониторинг</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="gap-2">
              <Icon name="Map" size={16} />
              <span className="hidden sm:inline">Карта</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="gap-2">
              <Icon name="FileText" size={16} />
              <span className="hidden sm:inline">Отчёты</span>
            </TabsTrigger>
            <TabsTrigger value="planning" className="gap-2">
              <Icon name="Target" size={16} />
              <span className="hidden sm:inline">Планирование</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardTab getRiskBadge={getRiskBadge} />
          </TabsContent>

          <TabsContent value="map">
            <MapTab />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsTab 
              selectedDocType={selectedDocType} 
              setSelectedDocType={setSelectedDocType} 
            />
          </TabsContent>

          <TabsContent value="planning">
            <PlanningTab getRiskBadge={getRiskBadge} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
