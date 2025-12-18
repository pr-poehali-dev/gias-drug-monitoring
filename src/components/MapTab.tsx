import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

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

export default function MapTab() {
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
              <div className="relative bg-muted/30 rounded-lg p-8 min-h-[500px] flex items-center justify-center border-2 border-dashed border-border">
                <div className="text-center space-y-4">
                  <Icon name="Map" size={64} className="mx-auto text-muted-foreground" />
                  <div>
                    <p className="text-xl font-semibold mb-2">Интерактивная карта Российской Федерации</p>
                    <p className="text-muted-foreground">Визуализация регионов с цветовой градацией по уровню риска</p>
                  </div>
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
                      <Tooltip />
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
