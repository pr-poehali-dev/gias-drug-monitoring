import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { month: 'Янв', нарушения: 145, проверки: 89, риски: 234 },
  { month: 'Фев', нарушения: 132, проверки: 95, риски: 198 },
  { month: 'Мар', нарушения: 178, проверки: 102, риски: 267 },
  { month: 'Апр', нарушения: 156, проверки: 87, риски: 221 },
  { month: 'Май', нарушения: 189, проверки: 110, риски: 289 },
  { month: 'Июн', нарушения: 167, проверки: 98, риски: 245 },
  { month: 'Июл', нарушения: 201, проверки: 115, риски: 312 },
  { month: 'Авг', нарушения: 184, проверки: 104, риски: 278 },
  { month: 'Сен', нарушения: 172, проверки: 93, риски: 253 },
  { month: 'Окт', нарушения: 195, проверки: 108, риски: 291 },
  { month: 'Ноя', нарушения: 211, проверки: 121, риски: 324 },
  { month: 'Дек', нарушения: 223, проверки: 128, риски: 348 }
];

const topRegions = [
  { region: 'Московская область', violations: 342, risk: 'high', trend: '+12%' },
  { region: 'Санкт-Петербург', violations: 298, risk: 'high', trend: '+8%' },
  { region: 'Свердловская область', violations: 267, risk: 'medium', trend: '+5%' },
  { region: 'Краснодарский край', violations: 234, risk: 'medium', trend: '+3%' },
  { region: 'Республика Татарстан', violations: 189, risk: 'medium', trend: '-2%' }
];

interface DashboardTabProps {
  getRiskBadge: (risk: string) => JSX.Element;
}

export default function DashboardTab({ getRiskBadge }: DashboardTabProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Всего нарушений</CardTitle>
            <Icon name="AlertTriangle" size={20} className="text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2,253</div>
            <p className="text-xs text-muted-foreground mt-1">+12.5% к прошлому месяцу</p>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Проведено проверок</CardTitle>
            <Icon name="CheckCircle" size={20} className="text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,278</div>
            <p className="text-xs text-muted-foreground mt-1">+8.3% к прошлому месяцу</p>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Риск-объекты</CardTitle>
            <Icon name="ShieldAlert" size={20} className="text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3,124</div>
            <p className="text-xs text-muted-foreground mt-1">Требуют контроля</p>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Активные дела</CardTitle>
            <Icon name="Briefcase" size={20} className="text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">487</div>
            <p className="text-xs text-muted-foreground mt-1">В производстве</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Динамика за 12 месяцев</CardTitle>
            <CardDescription>Статистика нарушений и проверок</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Line type="monotone" dataKey="нарушения" stroke="#ef4444" strokeWidth={2} />
                <Line type="monotone" dataKey="проверки" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Топ-5 регионов по нарушениям</CardTitle>
            <CardDescription>Горячие точки требующие внимания</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topRegions.map((region, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-medium">{region.region}</p>
                      <p className="text-sm text-muted-foreground">{region.violations} нарушений</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={region.trend.startsWith('+') ? 'destructive' : 'secondary'}>
                      {region.trend}
                    </Badge>
                    {getRiskBadge(region.risk)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
