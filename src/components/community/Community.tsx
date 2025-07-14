import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Heart, MessageCircle, Share, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Post {
  id: string;
  user: {
    alterEgo: string;
    avatar: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timeAgo: string;
  liked: boolean;
}

const Community: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      user: {
        alterEgo: 'Princesa Luna',
        avatar: '🌙',
      },
      content: 'Meninas, consegui finalmente fazer minha rotina de skincare completa! Estou me sentindo tão bem comigo mesma 💕',
      likes: 24,
      comments: 8,
      timeAgo: '2h',
      liked: false,
    },
    {
      id: '2',
      user: {
        alterEgo: 'Diva Sofia',
        avatar: '✨',
      },
      content: 'Alguém mais está ansiosa com as provas? Preciso de dicas para controlar a ansiedade 😰',
      likes: 15,
      comments: 12,
      timeAgo: '4h',
      liked: true,
    },
    {
      id: '3',
      user: {
        alterEgo: 'Angel Mel',
        avatar: '🍯',
      },
      content: 'Gente, descobri um método de manifestação incrível! Quem quer que eu compartilhe? 🌟',
      image: 'https://images.pexels.com/photos/1181248/pexels-photo-1181248.jpeg?auto=compress&cs=tinysrgb&w=400',
      likes: 32,
      comments: 18,
      timeAgo: '6h',
      liked: false,
    },
    {
      id: '4',
      user: {
        alterEgo: 'Flor de Lótus',
        avatar: '🪷',
      },
      content: 'Hoje foi um dia difícil, mas lembrei que sou forte e capaz. Obrigada por todo apoio que vocês sempre dão aqui 💪💕',
      likes: 41,
      comments: 25,
      timeAgo: '8h',
      liked: true,
    },
  ]);

  const [newPost, setNewPost] = useState('');

  const toggleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        user: {
          alterEgo: 'Você',
          avatar: '💕',
        },
        content: newPost,
        likes: 0,
        comments: 0,
        timeAgo: 'agora',
        liked: false,
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 overflow-x-hidden">
      <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-4 md:p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4">
              <Link
                to="/"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </Link>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-400 to-pink-600 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-display font-bold text-gray-800 dark:text-gray-100 leading-tight">Comunidade</h1>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">Espaço seguro para meninas se apoiarem 💕</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Create Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-4 md:p-6"
        >
          <h2 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3 md:mb-4 leading-tight">Compartilhe com a comunidade</h2>
          <div className="space-y-3 md:space-y-4">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Como você está se sentindo hoje? Compartilhe seus pensamentos, conquistas ou peça apoio... 💕"
              className="w-full h-20 md:h-24 p-3 md:p-4 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base"
            />
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                Lembre-se: este é um espaço seguro e respeitoso ✨
              </p>
              <button
                onClick={handleCreatePost}
                disabled={!newPost.trim()}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
              >
                <Plus className="w-4 h-4" />
                Publicar
              </button>
            </div>
          </div>
        </motion.div>

        {/* Community Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-4 md:p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200"
        >
          <h3 className="font-semibold text-purple-800 mb-2">💜 Diretrizes da Comunidade</h3>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• Seja gentil e respeitosa com todas</li>
            <li>• Apoie e encoraje outras meninas</li>
            <li>• Não compartilhe informações pessoais</li>
            <li>• Denuncie conteúdo inadequado</li>
          </ul>
        </motion.div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="card p-6"
            >
              {/* Post Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-lg">
                  {post.user.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100">{post.user.alterEgo}</h3>
                  <p className="text-sm text-gray-500">{post.timeAgo}</p>
                </div>
              </div>

              {/* Post Content */}
              <div className="mb-4">
                <p className="text-gray-700 leading-relaxed">{post.content}</p>
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post image"
                    className="mt-3 w-full h-48 object-cover rounded-xl"
                  />
                )}
              </div>

              {/* Post Actions */}
              <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    post.liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
                  <span>{post.likes}</span>
                </button>

                <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-purple-500 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.comments}</span>
                </button>

                <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-500 transition-colors">
                  <Share className="w-5 h-5" />
                  <span>Compartilhar</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center py-6"
        >
          <button className="btn-secondary">
            Carregar mais posts
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Community;