import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const RISK_COLORS = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#10b981'
};

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

const riskObjects = [
  { id: 1, name: 'Аптечная сеть "Здоровье+"', region: 'Московская обл.', risk: 'high', checks: 3, violations: 8, lastCheck: '15.11.2024' },
  { id: 2, name: 'ООО "ФармаТрейд"', region: 'Санкт-Петербург', risk: 'high', checks: 2, violations: 6, lastCheck: '22.11.2024' },
  { id: 3, name: 'Медицинский центр "Vita"', region: 'Краснодарский край', risk: 'medium', checks: 4, violations: 3, lastCheck: '10.12.2024' },
  { id: 4, name: 'Аптека "36.6"', region: 'Свердловская обл.', risk: 'medium', checks: 5, violations: 2, lastCheck: '05.12.2024' },
  { id: 5, name: 'Клиника "МедПлюс"', region: 'Республика Татарстан', risk: 'low', checks: 6, violations: 1, lastCheck: '18.12.2024' }
];

const documentTypes = [
  { value: 'analytical', label: 'Аналитическая справка', icon: 'FileText' },
  { value: 'representation', label: 'Представление об устранении нарушений', icon: 'AlertTriangle' },
  { value: 'warning', label: 'Предостережение о недопустимости нарушения', icon: 'ShieldAlert' },
  { value: 'letter', label: 'Информационное письмо в ведомства', icon: 'Mail' }
];

const regionData = [
  { name: 'Центральный ФО', value: 445, color: RISK_COLORS.high },
  { name: 'Северо-Западный ФО', value: 312, color: RISK_COLORS.high },
  { name: 'Южный ФО', value: 234, color: RISK_COLORS.medium },
  { name: 'Приволжский ФО', value: 289, color: RISK_COLORS.medium },
  { name: 'Уральский ФО', value: 198, color: RISK_COLORS.medium },
  { name: 'Сибирский ФО', value: 167, color: RISK_COLORS.low },
  { name: 'Дальневосточный ФО', value: 123, color: RISK_COLORS.low }
];

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

          <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
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
          </TabsContent>

          <TabsContent value="map" className="space-y-6 animate-fade-in">
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
          </TabsContent>

          <TabsContent value="reports" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Генератор документов</CardTitle>
                  <CardDescription>Выберите тип документа для формирования</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {documentTypes.map((doc) => (
                    <button
                      key={doc.value}
                      onClick={() => setSelectedDocType(doc.value)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        selectedDocType === doc.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon name={doc.icon as any} size={20} className="mt-1" />
                        <div>
                          <p className="font-medium">{doc.label}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                  <div className="pt-4 space-y-2">
                    <Button className="w-full">
                      <Icon name="Download" size={16} className="mr-2" />
                      Экспорт в PDF
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Icon name="FileText" size={16} className="mr-2" />
                      Экспорт в DOCX
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Icon name="Table" size={16} className="mr-2" />
                      Экспорт в CSV
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Предварительный просмотр документа</CardTitle>
                  <CardDescription>
                    {documentTypes.find(d => d.value === selectedDocType)?.label}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-white p-8 rounded-lg border min-h-[600px]">
                    <div className="space-y-6">
                      <div className="text-center border-b pb-6">
                        <div className="flex items-center justify-center gap-3 mb-4">
                          <Icon name="Scale" size={32} />
                          <div className="text-left">
                            <p className="font-bold text-lg">Генеральная прокуратура</p>
                            <p className="text-sm text-muted-foreground">Российской Федерации</p>
                          </div>
                        </div>
                        <h2 className="text-xl font-bold mt-4">
                          {selectedDocType === 'analytical' && 'Аналитическая справка'}
                          {selectedDocType === 'representation' && 'Представление об устранении нарушений'}
                          {selectedDocType === 'warning' && 'Предостережение о недопустимости нарушения закона'}
                          {selectedDocType === 'letter' && 'Информационное письмо'}
                        </h2>
                        <p className="text-sm text-muted-foreground mt-2">
                          по результатам мониторинга состояния законности<br />
                          в сфере оборота наркотических средств
                        </p>
                        <p className="text-sm mt-4">№ _____ от «___» __________ 2024 г.</p>
                      </div>

                      <div className="space-y-4 text-sm">
                        <p className="text-justify leading-relaxed">
                          В соответствии с Федеральным законом «О прокуратуре Российской Федерации» и во исполнение 
                          поручений Генерального прокурора Российской Федерации проведен мониторинг состояния законности 
                          в сфере оборота наркотических средств, психотропных веществ и их прекурсоров.
                        </p>
                        
                        <div>
                          <p className="font-semibold mb-2">По результатам проверки установлено:</p>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Выявлено 2,253 нарушения законодательства</li>
                            <li>Проведено 1,278 проверок объектов здравоохранения</li>
                            <li>Взято на контроль 3,124 риск-объекта</li>
                            <li>Возбуждено 487 производств по делам о нарушениях</li>
                          </ul>
                        </div>

                        <p className="text-justify leading-relaxed">
                          Анализ результатов показал наличие системных нарушений в {topRegions[0].region} 
                          ({topRegions[0].violations} зафиксированных случаев), {topRegions[1].region} 
                          ({topRegions[1].violations} случаев), а также {topRegions[2].region} 
                          ({topRegions[2].violations} случаев).
                        </p>

                        <div className="bg-muted/50 p-4 rounded">
                          <p className="font-semibold mb-2">Основные типы выявленных нарушений:</p>
                          <ul className="list-decimal list-inside space-y-1 ml-4 text-xs">
                            <li>Нарушения правил оборота наркотических средств в медицинских организациях</li>
                            <li>Несоблюдение порядка учета и хранения препаратов</li>
                            <li>Отсутствие необходимой документации</li>
                            <li>Нарушения при выписке рецептов</li>
                          </ul>
                        </div>

                        <p className="text-justify leading-relaxed">
                          На основании изложенного и руководствуясь статьями 21, 22, 24 Федерального закона 
                          «О прокуратуре Российской Федерации»...
                        </p>
                      </div>

                      <div className="border-t pt-6 flex justify-between items-end">
                        <div>
                          <p className="text-sm font-semibold">Прокурор</p>
                          <p className="text-xs text-muted-foreground mt-1">_______________</p>
                        </div>
                        <div className="text-right text-xs text-muted-foreground">
                          <p>Документ сформирован автоматически</p>
                          <p>ГИАС Прокурорского Надзора</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="planning" className="space-y-6 animate-fade-in">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
