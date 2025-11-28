import Card from '../Card';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

type Reaction = {
  likes: number;
  dislikes: number;
};

type DummyPost = {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: Reaction;
};

export default function PostViewer() {
  const [loading, setLoading] = useState<boolean>(true);
  const [post, setPost] = useState<DummyPost | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<DummyPost>('https://dummyjson.com/posts/1');
        setPost(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }
  if (!post) {
    return <div>No post found</div>;
  }

  return (
    <Card header='PostViewer' id='PostViewer'>
      <div>{post.title}</div>
      <div>{post.userId}</div>
      <div>{post.body}</div>
      <ul>
        {post.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <div>
        Reactions:
        <div>{post.reactions.likes}</div>
        <div>{post.reactions.dislikes}</div>
      </div>
    </Card>
  );
}
