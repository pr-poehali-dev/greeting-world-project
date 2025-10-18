import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

const mockArticles: Article[] = [
  {
    id: 1,
    title: 'Будущее веб-разработки в 2025 году',
    excerpt: 'Исследуем новые тренды и технологии, которые изменят подход к созданию веб-приложений в ближайшем будущем.',
    category: 'Технологии',
    date: '15 октября 2025',
    readTime: '5 мин',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop'
  },
  {
    id: 2,
    title: 'Минимализм в дизайне: искусство простоты',
    excerpt: 'Как создавать впечатляющие интерфейсы, используя принципы минималистичного дизайна и чистую типографику.',
    category: 'Дизайн',
    date: '12 октября 2025',
    readTime: '7 мин',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop'
  },
  {
    id: 3,
    title: 'Эффективная работа с TypeScript',
    excerpt: 'Практические советы и паттерны для написания типобезопасного кода, который легко поддерживать.',
    category: 'Разработка',
    date: '8 октября 2025',
    readTime: '6 мин',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop'
  },
  {
    id: 4,
    title: 'UX исследования: методы и инструменты',
    excerpt: 'Глубокое погружение в мир пользовательских исследований и методологии создания удобных продуктов.',
    category: 'Дизайн',
    date: '5 октября 2025',
    readTime: '8 мин',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=400&fit=crop'
  },
  {
    id: 5,
    title: 'Оптимизация производительности React',
    excerpt: 'Техники и подходы для создания быстрых и отзывчивых приложений на React без компромиссов.',
    category: 'Разработка',
    date: '1 октября 2025',
    readTime: '9 мин',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop'
  },
  {
    id: 6,
    title: 'Тренды мобильного дизайна 2025',
    excerpt: 'Обзор актуальных направлений в дизайне мобильных приложений и прогнозы на следующий год.',
    category: 'Технологии',
    date: '28 сентября 2025',
    readTime: '6 мин',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop'
  }
];

const categories = ['Все', 'Технологии', 'Дизайн', 'Разработка'];

export default function Index() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-secondary text-secondary-foreground py-16 px-6 mb-12 animate-fade-in">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">Блог</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl">
            Статьи о технологиях, дизайне и разработке
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-16">
        <div className="mb-10 space-y-6 animate-fade-in">
          <div className="relative">
            <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Поиск статей..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Badge
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className="cursor-pointer px-6 py-2 text-sm font-medium transition-all hover:scale-105"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <Icon name="FileSearch" className="mx-auto mb-4 text-muted-foreground" size={64} />
            <h3 className="font-heading text-2xl font-semibold mb-2">Статьи не найдены</h3>
            <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <Card 
                key={article.id} 
                className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(`/article/${article.id}`)}
              >
                <div className="aspect-video overflow-hidden bg-muted">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="font-medium">
                      {article.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Icon name="Clock" size={14} />
                      {article.readTime}
                    </span>
                  </div>
                  <CardTitle className="font-heading text-xl leading-tight group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {article.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/80 line-clamp-3">
                    {article.excerpt}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}