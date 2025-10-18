import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
    title: 'Привет, мир!',
    excerpt: 'Первая статья в блоге',
    category: 'Разработка',
    date: '19 октября 2025',
    readTime: '1 мин',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop'
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
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10 space-y-6 animate-fade-in">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder="Поиск статей..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg"
              />
            </div>
            <Button 
              onClick={() => navigate('/create')}
              size="lg"
              className="md:hidden"
            >
              <Icon name="Plus" size={20} />
            </Button>
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