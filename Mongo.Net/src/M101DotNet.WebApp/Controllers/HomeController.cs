using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using MongoDB.Driver;
using M101DotNet.WebApp.Models;
using M101DotNet.WebApp.Models.Home;
using MongoDB.Bson;
using System.Linq.Expressions;

namespace M101DotNet.WebApp.Controllers
{
    public class HomeController : Controller
    {
        public async Task<ActionResult> Index()
        {
            var blogContext = new BlogContext();
            // XXX WORK HERE
            // find the most recent 10 posts and order them
            // from newest to oldest
            //var user = await blogContext.Users.Find(x => x.Email == model.Email).SingleOrDefaultAsync();
            var recentPosts = await blogContext.Posts.Find(new BsonDocument())
                .SortBy(x => x.CreatedAtUtc)
                .Limit(10)
                .ToListAsync();
            
            var model = new IndexModel
            {
                RecentPosts = recentPosts
            };

            return View(model);
        }

        [HttpGet]
        public ActionResult NewPost()
        {
            return View(new NewPostModel());
        }

        [HttpPost]
        public async Task<ActionResult> NewPost(NewPostModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var blogContext = new BlogContext();
            // XXX WORK HERE
            // Insert the post into the posts collection
            String[]strTag = model.Tags.Split(new[] { ',', ' ' });
            var newComment = new Comment
            {
                Author = null,
                Content = null
            };

            List<Comment> comments = new List<Comment>();
            comments.Add(newComment);

            var post = new Post
            {
                Author = this.User.Identity.Name,
                Title = model.Title,
                Content = model.Content,
                Tags = strTag,
                CreatedAtUtc = new DateTime(),
                Comments = new List<Comment>()
            };

            await blogContext.Posts.InsertOneAsync(post);
            return RedirectToAction("Post", new { id = post.Id });
        }

        [HttpGet]
        public async Task<ActionResult> Post(string id)
        {
            var blogContext = new BlogContext();

            // XXX WORK HERE
            // Find the post with the given identifier

            var post = await blogContext.Posts.Find(x => x.Id == id).SingleOrDefaultAsync();

            if (post == null)
            {
                return RedirectToAction("Index");
            }

            var model = new PostModel
            {
                Post = post
            };

            return View(model);
        }

        [HttpGet]
        public async Task<ActionResult> Posts(string tag = null)
        {
            var blogContext = new BlogContext();

            // XXX WORK HERE
            // Find all the posts with the given tag if it exists.
            // Otherwise, return all the posts.
            // Each of these results should be in descending order.
            var builder = Builders<Post>.Filter;
            var filter = builder.ElemMatch(x => x.Tags, tag);

            var posts = await blogContext.Posts.Find(new BsonDocument()).ToListAsync();
            
            if (tag != null)
                posts = await blogContext.Posts.Find(filter).ToListAsync();

            return View(posts);
        }

        [HttpPost]
        public async Task<ActionResult> NewComment(NewCommentModel model)
        {
            if (!ModelState.IsValid)
            {
                return RedirectToAction("Post", new { id = model.PostId });
            }

            var blogContext = new BlogContext();
            // XXX WORK HERE
            // add a comment to the post identified by model.PostId.
            // you can get the author from "this.User.Identity.Name"
            var builder = Builders<Post>.Filter;
            var filter = builder.Eq(x => x.Id, model.PostId);

            var comment = new Comment
            {
                Author = this.User.Identity.Name,
                Content = model.Content,
                CreatedAtUtc = DateTime.Now
            };

            var builderUpdate = Builders<Post>.Update;
            var addFilter = builderUpdate.Push(x => x.Comments, comment);

            await blogContext.Posts.UpdateOneAsync(new BsonDocument(), addFilter);

            return RedirectToAction("Post", new { id = model.PostId });
        }
    }
}