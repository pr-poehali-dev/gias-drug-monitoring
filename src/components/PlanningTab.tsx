import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const riskObjects = [
  { id: 1, name: 'Аптечная сеть "Здоровье+"', region: 'Московская обл.', risk: 'high', checks: 3, violations: 8, lastCheck: '15.11.2024' },
  { id: 2, name: 'ООО "ФармаТрейд"', region: 'Санкт-Петербург', risk: 'high', checks: 2, violations: 6, lastCheck: '22.11.2024' },
  { id: 3, name: 'Медицинский центр "Vita"', region: 'Краснодарский край', risk: 'medium', checks: 4, violations: 3, lastCheck: '10.12.2024' },
  { id: 4, name: 'Аптека "36.6"', region: 'Свердловская обл.', risk: 'medium', checks: 5, violations: 2, lastCheck: '05.12.2024' },
  { id: 5, name: 'Клиника "МедПлюс"', region: 'Республика Татарстан', risk: 'low', checks: 6, violations: 1, lastCheck: '18.12.2024' }
];

interface PlanningTabProps {
  getRiskBadge: (risk: string) => JSX.Element;
}

export default function PlanningTab({ getRiskBadge }: PlanningTabProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <CardTitle>Система риск-ориентированного планирования</CardTitle>
              <CardDescription>Объекты, требующие первоочередного контроля</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button>
                <Icon name="Plus" size={16} className="mr-2" />
                Новая проверка
              </Button>
              <Button variant="outline">
                <Icon name="Calendar" size={16} className="mr-2" />
                Календарь
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Наименование объекта</TableHead>
                <TableHead>Регион</TableHead>
                <TableHead>Уровень риска</TableHead>
                <TableHead className="text-center">Проверки</TableHead>
                <TableHead className="text-center">Нарушения</TableHead>
                <TableHead>Последняя проверка</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {riskObjects.map((obj) => (
                <TableRow key={obj.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{obj.name}</TableCell>
                  <TableCell>{obj.region}</TableCell>
                  <TableCell>{getRiskBadge(obj.risk)}</TableCell>
                  <TableCell className="text-center">{obj.checks}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={obj.violations > 5 ? 'destructive' : obj.violations > 2 ? 'default' : 'secondary'}>
                      {obj.violations}
                    </Badge>
                  </TableCell>
                  <TableCell>{obj.lastCheck}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Icon name="Eye" size={16} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Icon name="Calendar" size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Алгоритм оценки рисков</CardTitle>
            <CardDescription>Критерии для определения приоритетности проверок</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <Icon name="AlertTriangle" size={20} className="text-destructive mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-sm">Высокий риск</p>
                  <ul className="text-xs text-muted-foreground mt-1 space-y-0.5">
                    <li>• Более 5 нарушений за последний год</li>
                    <li>• Период с последней проверки &gt; 6 месяцев</li>
                    <li>• Объем оборота наркотических средств &gt; критического</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                <Icon name="AlertCircle" size={20} className="text-yellow-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-sm">Средний риск</p>
                  <ul className="text-xs text-muted-foreground mt-1 space-y-0.5">
                    <li>• 2-5 нарушений за последний год</li>
                    <li>• Период с последней проверки 3-6 месяцев</li>
                    <li>• Объем оборота умеренный</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                <Icon name="CheckCircle" size={20} className="text-green-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-sm">Низкий риск</p>
                  <ul className="text-xs text-muted-foreground mt-1 space-y-0.5">
                    <li>• 0-1 нарушение за последний год</li>
                    <li>• Регулярные плановые проверки</li>
                    <li>• Объем оборота минимальный</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Статистика проверок</CardTitle>
            <CardDescription>Распределение по категориям риска</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={[
                { category: 'Высокий риск', запланировано: 45, выполнено: 38 },
                { category: 'Средний риск', запланировано: 78, выполнено: 72 },
                { category: 'Низкий риск', запланировано: 34, выполнено: 34 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="category" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="запланировано" fill="#cbd5e1" />
                <Bar dataKey="выполнено" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
