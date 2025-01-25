import AuthAPI from "./api/auth";
import PostsAPI from "./api/posts";
import CommentsAPI from "./api/comments";
import FollowsAPI from "./api/follows";
import FeedAPI from "./api/feed";

class ApiClient {
  public auth: AuthAPI;
  public posts: PostsAPI;
  public comments: CommentsAPI;
  public follows: FollowsAPI;
  public feed: FeedAPI;

  constructor(baseURL: string, defaultHeaders: Record<string, string> = {}, timeout: number = 5000) {
    this.auth = new AuthAPI(baseURL, defaultHeaders, timeout);
    this.posts = new PostsAPI(baseURL, defaultHeaders, timeout);
    this.comments = new CommentsAPI(baseURL, defaultHeaders, timeout);
    this.follows = new FollowsAPI(baseURL, defaultHeaders, timeout);
    this.feed = new FeedAPI(baseURL, defaultHeaders, timeout);
  }

  // Set token for all modules
  setToken(token: string) {
    this.auth.setToken(token);
    this.posts.setToken(token);
    this.comments.setToken(token);
    this.follows.setToken(token);
    this.feed.setToken(token);
  }

  // Clear token for all modules
  clearToken() {
    this.auth.clearToken();
    this.posts.clearToken();
    this.comments.clearToken();
    this.follows.clearToken();
    this.feed.clearToken();
  }

  // Update client configuration for all modules
  updateConfig(config: Partial<{ baseURL: string; headers: Record<string, string>; timeout: number }>) {
    const { baseURL, headers, timeout } = config;
    if (baseURL) {
      this.auth.updateConfig({ baseURL });
      this.posts.updateConfig({ baseURL });
      this.comments.updateConfig({ baseURL });
      this.follows.updateConfig({ baseURL });
      this.feed.updateConfig({ baseURL });
    }
    if (headers) {
      this.auth.updateConfig({ headers });
      this.posts.updateConfig({ headers });
      this.comments.updateConfig({ headers });
      this.follows.updateConfig({ headers });
      this.feed.updateConfig({ headers });
    }
    if (timeout) {
      this.auth.updateConfig({ timeout });
      this.posts.updateConfig({ timeout });
      this.comments.updateConfig({ timeout });
      this.follows.updateConfig({ timeout });
      this.feed.updateConfig({ timeout });
    }
  }
}

export default ApiClient;
