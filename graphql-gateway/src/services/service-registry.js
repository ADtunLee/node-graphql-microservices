import * as grpc from 'grpc'

import CommentServiceClient from './comments/comment.client'
import PostServiceClient from './posts/post.client'
import UserServiceClient from './users/user.client'

import CommentService from './comments/comment.service'
import PostService from './posts/post.service'
import UserService from './users/user.service'

class ServiceRegistry {
  constructor(logger) {
    const grpcCredentials = grpc.credentials.createInsecure()

    const commentServiceClient = new CommentServiceClient(process.env.COMMENTS_SVC_URL, grpcCredentials)
    const postServiceClient = new PostServiceClient(process.env.POSTS_SVC_URL, grpcCredentials)
    const userServiceClient = new UserServiceClient(process.env.USERS_SVC_URL, grpcCredentials)

    this._services = {
      commentService: new CommentService(commentServiceClient, logger),
      postService: new PostService(postServiceClient, logger),
      userService: new UserService(userServiceClient, logger)
    }
  }

  get services() {
    return this._services
  }
}

export default ServiceRegistry
