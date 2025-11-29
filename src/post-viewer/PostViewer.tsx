import Card from '../Card';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './PostViewer.scss';

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
    return (
      <Card header='Post Viewer' id='PostViewer'>
        <div className='loading'>Loading post...</div>
      </Card>
    );
  }
  if (!post) {
    return (
      <Card header='Post Viewer' id='PostViewer'>
        <div className='error'>No post found</div>
      </Card>
    );
  }

  return (
    <Card header='Post Viewer' id='PostViewer'>
      <div className='post-content'>
        <div className='post-header'>
          <h2>{post.title}</h2>
          <span className='user-badge'>User {post.userId}</span>
        </div>

        <div className='post-body'>{post.body}</div>

        {post.tags.length > 0 && (
          <ul className='tags'>
            {post.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}

        <div className='reactions'>
          <div className='reaction'>
            <span className='emoji'>👍</span>
            <span className='count'>{post.reactions.likes}</span>
          </div>
          <div className='reaction'>
            <span className='emoji'>👎</span>
            <span className='count'>{post.reactions.dislikes}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
