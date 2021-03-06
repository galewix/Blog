import * as React from 'react';
import * as s from './blog.scss';
import { PostCard } from './PostCard/PostCard';
import { Button } from '../../Button/Button';
import { TagContainer } from '../../Tag';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
export default class Blog extends React.Component {
  componentDidMount() {
    const { posts, loading } = this.props;
    if (!posts.length && !loading) {
      this.props.fetchPosts();
    }
  }

  render() {
    const { activeTags, loading, fetchPosts, posts } = this.props;
    return (
      <>
        <h1 className={'page-title'}>Blog</h1>
        <ActiveTagsList activeTags={activeTags} />

        <PostsList posts={posts} isLoading={loading} />

        <LoadMoreButton onClick={fetchPosts} disabled={loading} />
      </>
    );
  }
}

const LoadMoreButton = ({ onClick, disabled, ...props }) => (
  <div className={'load-more-button'}>
    <Button
      onClick={onClick}
      theme={'dark'}
      style={{ width: '100%' }}
      disabled={disabled}
      {...props}
    >
      Load More Posts
    </Button>
  </div>
);

const loadingState = () => {
  return new Array(4)
    .fill({})
    .map((post, index) => <PostCard {...post} key={`${index}-fake`} />);
};

const PostsList = ({ posts, isLoading }) => {
  return (
    <>
      <TransitionGroup className={'posts-container'}>
        {posts.map(post => (
          <CSSTransition key={post.id} timeout={300} classNames="fade">
            <PostCard {...post} />
          </CSSTransition>
        ))}
      </TransitionGroup>
      {isLoading && loadingState()}
    </>
  );
};

const ActiveTagsList = ({ activeTags }) => {
  return (
    <div className={'activeTags'}>
      <TagContainer>
        {({ removeTagFilter }) => {
          return activeTags.map(tag => (
            <span
              key={tag}
              onClick={() => removeTagFilter(tag)}
              className="tag"
            >
              <small className={'tagDelete'}>x</small>
              {tag}
            </span>
          ));
        }}
      </TagContainer>
    </div>
  );
};
