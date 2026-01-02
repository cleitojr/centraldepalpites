import React from "react"
import { SectionTitle } from "../components/SectionTitle"
import { Badge } from "../components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { AspectRatio } from "../components/ui/aspect-ratio"
import { Calendar } from "lucide-react"

export function BlogPage() {
  const posts = [
    {
      title: "Como funciona o Handicap Asiático",
      category: "Educação",
      date: "24 Out",
      excerpt: "Entenda de uma vez por todas como utilizar essa ferramenta para proteger seus palpites.",
      image: "https://images.unsplash.com/photo-1514863775978-c611132e6691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    },
    {
      title: "Gestão de Banca: O Guia Definitivo",
      category: "Estratégia",
      date: "22 Out",
      excerpt: "A diferença entre o amador e o profissional está na gestão. Aprenda as melhores práticas.",
      image: "https://images.unsplash.com/photo-1649848964263-2666b0c355a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    },
    {
      title: "Análise de xG (Expected Goals)",
      category: "Dados Avançados",
      date: "20 Out",
      excerpt: "Por que chutar muito não significa jogar bem? Entenda a métrica que revolucionou o futebol.",
      image: "https://images.unsplash.com/photo-1599204607024-c25aceee0337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    },
    {
      title: "Os perigos das Múltiplas",
      category: "Alerta",
      date: "18 Out",
      excerpt: "Matematicamente desfavoráveis, mas populares. Saiba quando (e se) vale a pena fazer.",
      image: "https://images.unsplash.com/photo-1632380148925-ff9f845087f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionTitle title="Blog & Artigos" subtitle="Conteúdo educativo para elevar seu nível" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <Card key={i} className="bg-slate-900 border-slate-800 hover:border-[#00FF88]/50 hover:shadow-lg hover:shadow-[#00FF88]/10 transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col">
            <div className="w-full relative overflow-hidden">
              <AspectRatio ratio={16 / 9}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
              </AspectRatio>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4">
                <Badge className="bg-[#00FF88] text-slate-950 font-black text-[10px] uppercase tracking-widest">{post.category}</Badge>
              </div>
            </div>
            <CardHeader className="pt-6 pb-2">
              <div className="flex items-center text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2">
                <Calendar className="w-3 h-3 mr-1.5 text-[#00FF88]" /> {post.date}
              </div>
              <h3 className="text-xl font-black text-white group-hover:text-[#00FF88] transition-colors leading-tight italic tracking-tighter">{post.title}</h3>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-slate-400 text-sm leading-relaxed font-medium line-clamp-2">{post.excerpt}</p>
            </CardContent>
            <CardFooter className="pt-0 pb-6">
              <Button variant="link" className="text-[#00FF88] p-0 h-auto font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">Ler Artigo Completo &rarr;</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
