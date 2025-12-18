import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const documentTypes = [
  { value: 'analytical', label: 'Аналитическая справка', icon: 'FileText' },
  { value: 'representation', label: 'Представление об устранении нарушений', icon: 'AlertTriangle' },
  { value: 'warning', label: 'Предостережение о недопустимости нарушения', icon: 'ShieldAlert' },
  { value: 'letter', label: 'Информационное письмо в ведомства', icon: 'Mail' }
];

const topRegions = [
  { region: 'Московская область', violations: 342, risk: 'high', trend: '+12%' },
  { region: 'Санкт-Петербург', violations: 298, risk: 'high', trend: '+8%' },
  { region: 'Свердловская область', violations: 267, risk: 'medium', trend: '+5%' }
];

interface ReportsTabProps {
  selectedDocType: string;
  setSelectedDocType: (value: string) => void;
}

export default function ReportsTab({ selectedDocType, setSelectedDocType }: ReportsTabProps) {
  return (
    <div className="space-y-6 animate-fade-in">
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
    </div>
  );
}
