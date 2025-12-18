import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { PieChart, Pie, Cell, Tooltip as ChartTooltip, ResponsiveContainer } from 'recharts';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';

const RISK_COLORS = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#10b981'
};

const regionData = [
  { name: 'Центральный ФО', value: 445, color: RISK_COLORS.high },
  { name: 'Северо-Западный ФО', value: 312, color: RISK_COLORS.high },
  { name: 'Южный ФО', value: 234, color: RISK_COLORS.medium },
  { name: 'Приволжский ФО', value: 289, color: RISK_COLORS.medium },
  { name: 'Уральский ФО', value: 198, color: RISK_COLORS.medium },
  { name: 'Сибирский ФО', value: 167, color: RISK_COLORS.low },
  { name: 'Дальневосточный ФО', value: 123, color: RISK_COLORS.low }
];

const russiaRegions = [
  { id: 'RU-MOW', name: 'Москва', risk: 'high' },
  { id: 'RU-SPE', name: 'Санкт-Петербург', risk: 'high' },
  { id: 'RU-MOS', name: 'Московская область', risk: 'high' },
  { id: 'RU-LEN', name: 'Ленинградская область', risk: 'high' },
  { id: 'RU-SVE', name: 'Свердловская область', risk: 'medium' },
  { id: 'RU-KDA', name: 'Краснодарский край', risk: 'medium' },
  { id: 'RU-ROS', name: 'Ростовская область', risk: 'medium' },
  { id: 'RU-NIZ', name: 'Нижегородская область', risk: 'medium' },
  { id: 'RU-CHE', name: 'Челябинская область', risk: 'medium' },
  { id: 'RU-SAM', name: 'Самарская область', risk: 'medium' },
  { id: 'RU-UFA', name: 'Республика Башкортостан', risk: 'low' },
  { id: 'RU-PER', name: 'Пермский край', risk: 'low' },
  { id: 'RU-VOR', name: 'Воронежская область', risk: 'low' },
  { id: 'RU-KEM', name: 'Кемеровская область', risk: 'low' },
  { id: 'RU-ALT', name: 'Алтайский край', risk: 'low' },
  { id: 'RU-KYA', name: 'Красноярский край', risk: 'low' },
  { id: 'RU-IRK', name: 'Иркутская область', risk: 'low' },
  { id: 'RU-NVS', name: 'Новосибирская область', risk: 'low' },
  { id: 'RU-OMS', name: 'Омская область', risk: 'low' },
  { id: 'RU-TOM', name: 'Томская область', risk: 'low' }
];

export default function MapTab() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const getRegionColor = (geo: any) => {
    const regionId = geo.id;
    const region = russiaRegions.find(r => r.id === regionId);
    
    if (!region) return '#e5e7eb';
    
    if (region.risk === 'high') return RISK_COLORS.high;
    if (region.risk === 'medium') return RISK_COLORS.medium;
    if (region.risk === 'low') return RISK_COLORS.low;
    
    return '#e5e7eb';
  };

  const getRegionData = (geo: any) => {
    const regionId = geo.id;
    return russiaRegions.find(r => r.id === regionId);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <CardTitle>Интерактивная карта России</CardTitle>
              <CardDescription>Цветовая градация регионов по уровню риска</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Тип наркотиков" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все типы</SelectItem>
                  <SelectItem value="synthetic">Синтетические</SelectItem>
                  <SelectItem value="natural">Натуральные</SelectItem>
                  <SelectItem value="psychotropic">Психотропные</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="2024">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Период" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024 год</SelectItem>
                  <SelectItem value="q4">4 квартал</SelectItem>
                  <SelectItem value="month">Текущий месяц</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="relative bg-white rounded-lg border min-h-[500px] overflow-hidden">
                <ComposableMap
                  projection="geoMercator"
                  projectionConfig={{
                    center: [100, 65],
                    scale: 400
                  }}
                  className="w-full h-[500px]"
                >
                  <ZoomableGroup
                    center={[100, 65]}
                    zoom={1}
                    minZoom={1}
                    maxZoom={8}
                  >
                    <Geographies geography="https://raw.githubusercontent.com/deldersveld/topojson/master/countries/russia/russia-subjects.json">
                      {({ geographies }) =>
                        geographies.map((geo) => {
                          const regionData = getRegionData(geo);
                          return (
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              fill={getRegionColor(geo)}
                              stroke="#ffffff"
                              strokeWidth={0.5}
                              style={{
                                default: {
                                  outline: 'none',
                                  transition: 'all 0.2s'
                                },
                                hover: {
                                  fill: regionData ? '#1e40af' : '#d1d5db',
                                  outline: 'none',
                                  cursor: 'pointer'
                                },
                                pressed: {
                                  outline: 'none'
                                }
                              }}
                              onMouseEnter={() => {
                                if (regionData) {
                                  setHoveredRegion(regionData.name);
                                }
                              }}
                              onMouseLeave={() => {
                                setHoveredRegion(null);
                              }}
                              onClick={() => {
                                if (regionData) {
                                  setSelectedRegion(regionData.name);
                                }
                              }}
                            />
                          );
                        })
                      }
                    </Geographies>
                  </ZoomableGroup>
                </ComposableMap>
                {hoveredRegion && (
                  <div className="absolute top-4 left-4 bg-white shadow-lg rounded-lg p-3 border">
                    <p className="font-semibold text-sm">{hoveredRegion}</p>
                  </div>
                )}
                {selectedRegion && (
                  <div className="absolute bottom-4 left-4 bg-primary text-primary-foreground shadow-lg rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Icon name="MapPin" size={16} />
                      <p className="font-semibold text-sm">Выбран: {selectedRegion}</p>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 text-primary-foreground hover:bg-white/20"
                        onClick={() => setSelectedRegion(null)}
                      >
                        <Icon name="X" size={14} />
                      </Button>
                    </div>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white shadow-lg rounded-lg p-2 border">
                  <p className="text-xs text-muted-foreground mb-1">Используйте колёсико мыши</p>
                  <p className="text-xs text-muted-foreground">для масштабирования карты</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: RISK_COLORS.high }}></div>
                  <span className="text-sm">Высокий риск</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: RISK_COLORS.medium }}></div>
                  <span className="text-sm">Средний риск</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: RISK_COLORS.low }}></div>
                  <span className="text-sm">Низкий риск</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Распределение по федеральным округам</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={regionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {regionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-4">
                    {regionData.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                          <span>{item.name}</span>
                        </div>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}