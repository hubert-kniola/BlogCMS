﻿using GraphQL.Core.Entities;
using MongoDB.Driver;

namespace GraphQL.Infrastructure.Data
{
    public class CatalogContextSeed
    {
        public static void SeedData(
            IMongoDatabase database)
        {
            InsertCategories(database.GetCollection<Category>(nameof(Category)));
            InsertPosts(database.GetCollection<Post>(nameof(Post)));
        }

        private static void InsertCategories(IMongoCollection<Category> categoryCollection)
        {
            categoryCollection.DeleteMany(_ => true);
            categoryCollection.InsertMany(
                new List<Category>
                {
                    new Category
                    {
                        Id = "605fbfdda571444fd7ade05b",
                        Description = "Category Description One",
                        CreatedOn = DateTime.Now,
                        ModifiedOn = DateTime.Now,
                    },
                    new Category
                    {
                        Id = "605fbfecdefb479679f08517",
                        Description = "Category Description Two",
                        CreatedOn = DateTime.Now,
                        ModifiedOn = DateTime.Now,
                    }
                });
        }

        private static void InsertPosts(IMongoCollection<Post> productCollection)
        {
            productCollection.DeleteMany(_ => true);
            productCollection.InsertMany(
                new List<Post>
                {
                    new Post
                    {
                        Id = "605fbfd4f0d09d08fba6bd80",
                        Name = "Post Name One",
                        Content = "Post Description One",
                        CategoryId = "605fbfdda571444fd7ade05b",
                        CreatedOn = DateTime.Now,
                        ModifiedOn = DateTime.Now,

                    },
                    new Post
                    {
                        Id = "605fbfe4690cd322f1ef0d15",
                        Name = "Product Name Two",
                        Content = "Post Description Two",
                        CategoryId = "605fbfecdefb479679f08517",
                        CreatedOn = DateTime.Now,
                        ModifiedOn = DateTime.Now,
                    }
                });
        }
    }
}
