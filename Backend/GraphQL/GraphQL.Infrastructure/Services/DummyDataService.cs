using DnsClient.Internal;
using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using GraphQL.Core.Services;
using System.ComponentModel;

namespace GraphQL.Infrastructure.Services
{
    public class DummyDataService : IDummyDataService
    {
        #region HtmlContent
        private const string _htmlContent =
            "<h3><u>The standard Lorem Ipsum passage, used since the 1500s</u></h3>\r\n<p style=\"text-align: center;\">&quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.&quot;</p>\r\n<h3><s>Section 1.10.32 of &quot;de Finibus Bonorum et Malorum&quot;, written by Cicero in 45 BC</s></h3>\r\n<p style=\"text-align: justify;\">&quot;Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam <span style=\"text-shadow: 3px 3px 2px rgba(136, 136, 136, 0.8);\">nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?&quot;</span></p>\r\n<h3><span style=\"text-shadow: 3px 3px 2px rgba(136, 136, 136, 0.8);\">1914 translation by H. Rackham</span><sub><span style=\"text-shadow: 3px 3px 2px rgba(136, 136, 136, 0.8);\">123</span></sub></h3>\r\n<p>&quot;But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?&quot;</p>\r\n<h3>Section 1.10.33 of &quot;de Finibus Bonorum et Malorum&quot;, written by Cicero in 45 BC<sup>123</sup></h3>\r\n<p style=\"text-align: right;\">&quot;At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.&quot;</p>\r\n<h3 style=\"text-align: right;\">1914 translation by H. Rackham</h3>\r\n<p><span style=\"font-family: Symbol;\">&quot;On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.&quot;</span></p>";
        #endregion HtmlContent

        private ICategoryRepository _categoryRepository;
        private IPostRepository _postRepository;
        private IAboutRepository _aboutRepository;
        private IContactInfoRepository _contactInfoRepository;
        private IContactFormRepository _contactFormRepository;
        private ICarouselRepository _carouselRepository;
        private IFaqReposiotry _faqReposiotry;
        private ICategoryService _categoryService;
        private IContentRepository _contentRepository;
        private IContentService _contentService;


        public DummyDataService(
            ICategoryRepository categoryRepository,
            IPostRepository postRepository,
            IAboutRepository aboutRepository,
            IContactInfoRepository contactInfoRepository,
            IContactFormRepository contactFormRepository,
            ICarouselRepository carouselRepository,
            IFaqReposiotry faqReposiotry,
            ICategoryService categoryService,
            IContentRepository contentRepository,
            IContentService contentService
            )
        {
            _categoryRepository = categoryRepository;
            _postRepository = postRepository;
            _aboutRepository = aboutRepository;
            _contactInfoRepository = contactInfoRepository;
            _contactFormRepository = contactFormRepository;
            _carouselRepository = carouselRepository;
            _faqReposiotry = faqReposiotry;
            _categoryService = categoryService;
            _contentRepository = contentRepository;
            _contentService = contentService;
        }

        public async Task<bool> Execute()
        {
            bool success;
            //success = await SetDummyAbout();
            //success = await SetDummyContactInfo();
            //success = await SetDummyContactForm();
            //success = await SetDummyCarousels();
            //success = await SetDummyFaq();
            //success = await SetDummyContent();
            success = await SetDummyPostAndCategory();

            return success;
        }

        private async Task<bool> SetDummyAbout()
        {
            About about = new()
            {
                Title = "Poznajmy się!",
                Text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempor eleifend elit vel fermentum. " +
                       "In at lorem commodo sem aliquam ultricies. Curabitur hendrerit aliquet ligula vitae dignissim. Aliquam lobortis " +
                       "molestie metus, nec sagittis elit iaculis sed. Aenean arcu odio, mattis vitae tincidunt eget, placerat sed massa. " +
                       "Nullam luctus nulla sit amet leo bibendum, vitae auctor elit pellentesque. Vestibulum luctus, ipsum congue semper " +
                       "consectetur, velit tellus luctus enim, maximus molestie mauris diam vel odio. Morbi sodales, mi sed eleifend venenatis, " +
                       "lacus felis pharetra ipsum, ac lobortis libero libero in lectus.",
                ImgName = "07e8f032-22ad-4db2-952b-1bd9b4780bbb.jpg"
            };

            return await SetDummyItem(_aboutRepository, about);
        }

        private async Task<bool> SetDummyContactInfo()
        {
            ContactInfo contact = new()
            {
                Title = "Chcesz się skontaktować?",
                Content = "Podziel się Twoimi doświadczeniami! Powiedz co Cię inspiruje. A może chcesz uzyskać wiecej informacji odnośnie jakiegoś postu?",
                TextBoxes = new List<TextBox>()
                    {
                        new TextBox(){FieldName = "Email", Content= "mail@mail.pl" },
                        new TextBox(){FieldName = "Telefon", Content= "+48 123 456 789" },
                        new TextBox(){FieldName = "Instagram", Content= "www.instagram.com/instagram" },
                    }
            };
            return await SetDummyItem(_contactInfoRepository, contact);
        }

        private async Task<bool> SetDummyContactForm()
        {
            List<ContactForm> data = new()
            {
                new ContactForm()
                {
                    Name = "Adam Kowalski",
                    Email = "jakis@email.com",
                    Content = "Cześć jestem Adam Kowalski"
                },
                new ContactForm()
                {
                    Name = "Andrzej Nowak",
                    Email = "adam@nowak.com",
                    Content = "Cześć jestem Andrzej Nowak"
                },
                new ContactForm()
                {
                    Name = "Przemek Gość",
                    Email = "przemekgosc@email.com",
                    Content = "Cześć jestem Przemek Gość"
                }
            };

            return await SetManyDummyItems(_contactFormRepository, data);
        }

        private async Task<bool> SetDummyCarousels()
        {
            List<Carousel> data = new()
            {
                new Carousel()
                {
                    Title = "Pierwszy element",
                    Content = "1: Tutaj jakis krotki opis ",
                    PublicationDate = DateTime.Now,
                    ImgName = "1b31fbbc-458a-41ab-b103-20d94ae7ba10.jpg",
                    Active = true,
                    Url = "http://localhost:8080/",
                },
                new Carousel()
                {
                    Title = "Drugi element",
                    Content = "2: Tutaj jakis krotki opis ",
                    PublicationDate = DateTime.Now,
                    ImgName = "1cc8655b-0aca-44da-af78-7d712d92cece.jpg",
                    Active = true,
                    Url = "http://localhost:8080/",
                },
                new Carousel()
                {
                    Title = "Trzeci element",
                    Content = "3: Tutaj jakis krotki opis ",
                    PublicationDate = DateTime.Now,
                    ImgName = "4027801e-d25a-4b36-a719-5d58504958bb.jpg",
                    Active = true,
                    Url = "http://localhost:8080/",
                },
                new Carousel()
                {
                    Title = "Czwarty element",
                    Content = "4: Tutaj jakis krotki opis ",
                    PublicationDate = DateTime.Now,
                    ImgName = "8aa1bc44-ba97-41fe-8c6a-53266dc97ecc.jpg",
                    Active = true,
                    Url = "http://localhost:8080/",
                },
                new Carousel()
                {
                    Title = "Piąty element",
                    Content = "5: Tutaj jakis krotki opis ",
                    PublicationDate = DateTime.Now,
                    ImgName = "a62860cd-5115-4ae2-982c-7f365cea160a.jpg",
                    Active = true,
                    Url = "http://localhost:8080/",
                },
                new Carousel()
                {
                    Title = "Szósty element",
                    Content = "6: Tutaj jakis krotki opis ",
                    PublicationDate = DateTime.Now,
                    ImgName = "f8c99c62-b222-4555-bc8f-9cc154b6919d.jpg",
                    Active = true,
                    Url = "http://localhost:8080/",
                },
                new Carousel()
                {
                    Title = "Czwarty element",
                    Content = "7: Tutaj jakis krotki opis ",
                    PublicationDate = DateTime.Now,
                    ImgName = "1b31fbbc-458a-41ab-b103-20d94ae7ba10.jpg",
                    Active = false,
                    Url = "http://localhost:8080/",
                },
                new Carousel()
                {
                    Title = "Piąty element",
                    Content = "8: Tutaj jakis krotki opis ",
                    PublicationDate = DateTime.Now,
                    ImgName = "8aa1bc44-ba97-41fe-8c6a-53266dc97ecc.jpg",
                    Active = false,
                    Url = "http://localhost:8080/",
                },
                new Carousel()
                {
                    Title = "Szósty element",
                    Content = "9: Tutaj jakis krotki opis ",
                    PublicationDate = DateTime.Now,
                    ImgName = "1b31fbbc-458a-41ab-b103-20d94ae7ba10.jpg",
                    Active = false,
                    Url = "http://localhost:8080/",
                }
            };

            return await SetManyDummyItems(_carouselRepository, data);
        }

        private async Task<bool> SetDummyFaq()
        {
            List<Faq> data = new()
            {
                new()
                {
                    Question = "Czy mogę założyć konto",
                    Answer = "Niestety nie. Tylko ja mogę publikować treści."
                },
                new()
                {
                    Question = "Czy to ma sens",
                    Answer = "Prawdopodobnie nie"
                },
                new()
                {
                    Question = "Podasz fragment lorum?",
                    Answer = "Lorem Ipsum is simply dummy text of the printing and typesetting " +
                       "industry. Lorem Ipsum has been the industry's standard dummy text ever since " +
                       "the 1500s, when an unknown printer took a galley of type and scrambled it to " +
                       "make a type specimen book. It has survived not only five centuries, but also the " +
                       "leap into electronic typesetting, remaining essentially unchanged. It was popularised " +
                       "in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, " +
                       "and more recently with desktop publishing software like Aldus PageMaker including " +
                       "versions of Lorem Ipsum."
                }
            };

            return await SetManyDummyItems(_faqReposiotry, data);
        }

        private async Task<bool> SetDummyCategory()
        {
            if (await _categoryRepository.RemoveAllAsync())
            {
                Category? main = await _categoryService.AddCategory(new()
                {
                    Title = "Posty",
                    Path = "/posts",
                });

                #region Lvl1

                Category? webDesign = await _categoryService.AddCategory(new()
                {
                    Title = "Web development",
                    Path = "/web-dev",
                    ParentId = main.Id,
                });

                Category? webDevelopment = await _categoryService.AddCategory(new()
                {
                    Title = "Web design",
                    Path = "/web-design",
                    ParentId = main.Id,
                });

                #region Lvl2

                Category? backend = await _categoryService.AddCategory(new()
                {
                    Title = "Backen",
                    Path = "/b-end",
                    ParentId = webDevelopment.Id,
                });

                #region Lvl3

                Category? dotNet = await _categoryService.AddCategory(new()
                {
                    Title = ".NET",
                    Path = "dot-net",
                    ParentId = backend.Id
                });
                Category? java = await _categoryService.AddCategory(new()
                {
                    Title = "Java",
                    Path = "java",
                    ParentId = backend.Id
                });
                Category? python = await _categoryService.AddCategory(new()
                {
                    Title = "python",
                    Path = "python",
                    ParentId = backend.Id
                });
                #endregion lvl3

                Category? frontend = await _categoryService.AddCategory(new()
                {
                    Title = "Frontend",
                    Path = "/f-end",
                    ParentId = webDevelopment.Id,
                });
                #endregion Lvl2

                Category? seo = await _categoryService.AddCategory(new()
                {
                    Title = "SEO",
                    Path = "/seo",
                    ParentId = main.Id,
                });
                #endregion Lvl1

                _ = await _categoryService.AddCategory(new()
                {
                    Title = "About",
                    Path = "/aboutme",
                    IsConst = true,
                });

                _ = await _categoryService.AddCategory(new()
                {
                    Title = "Contact",
                    Path = "/contact",
                    IsConst = true,
                });

                return true;
            }

            return false;
        }

        private async Task<bool> SetDummyContent()
        {
            if (await _contentRepository.RemoveAllAsync())
            {
                return await SetManyDummyItems(_contentRepository, new List<Content>()
                {
                    new Content()
                    {
                        Name = "Last Post Title",
                        Value = "Hej! Sprawdź moje ostatnie posty",
                        Type = ContentType.LastPost,
                        ModifiedOn= DateTime.Now,
                        CreatedOn= DateTime.Now,
                    },
                    new Content()
                    {
                        Name = "Footer_1",
                        Value = "Jakaś informacja do footera 1",
                        Type = ContentType.Footer,
                        ModifiedOn= DateTime.Now,
                        CreatedOn= DateTime.Now,
                    },
                    new Content()
                    {
                        Name = "Footer_2",
                        Value = "Jakaś informacja do footera 2",
                        Type = ContentType.Footer,
                        ModifiedOn= DateTime.Now,
                        CreatedOn= DateTime.Now,
                    },
                    new Content()
                    {
                        Name = "Footer_3",
                        Value = "Jakaś informacja do footera 3",
                        Type = ContentType.Footer,
                        ModifiedOn= DateTime.Now,
                        CreatedOn= DateTime.Now,
                    }
                });
            }

            return false;
        }

        public async Task<bool> SetDummyPostAndCategory()
        {
            if (await _postRepository.RemoveAllAsync())
            {
                string[] pictures = {
                            "1b31fbbc-458a-41ab-b103-20d94ae7ba10.jpg",
                            "1cc8655b-0aca-44da-af78-7d712d92cece.jpg",
                            "2213a8b7-3019-4559-ad39-7176ac1a8651.jpg",
                            "4027801e-d25a-4b36-a719-5d58504958bb.jpg",
                            "07e8f032-22ad-4db2-952b-1bd9b4780bbb.jpg"
                };
                IEnumerable<Category>? categoryList = null;

                bool success = await SetDummyCategory();
                if (!success)
                    return false;
                else
                    categoryList = await _categoryRepository.GetAllTags();

                if (categoryList != null)
                {
                    IEnumerable<string> categoryListId = categoryList.Select(x => x.Id);

                    List<Post> postList = new();

                    for (int i = 0; i < 10; i++)
                    {
                        postList.Add(new Post()
                        {
                            Title = $"To jest tytuł pierwszego wpisu - ale nie wiem jak ma się nazywać, ma być długi. Tak żeby zajmował dwie linie [{i}]",
                            Content = _htmlContent,
                            Snippet = "Tutaj będzie jakiś snippet bla bla bla - opis postu co? jak? gdzie? po co? dlaczego? co to ma na celu? Czy to ma sens?",
                            TimeToReadInMs = $"{5 + i}",
                            PrimaryImgName = pictures[i%2],
                            ContentImgName = new List<string>() {
                            "1b31fbbc-458a-41ab-b103-20d94ae7ba10.jpg",
                            "1cc8655b-0aca-44da-af78-7d712d92cece.jpg",
                            "2213a8b7-3019-4559-ad39-7176ac1a8651.jpg",
                            "4027801e-d25a-4b36-a719-5d58504958bb.jpg",
                            "07e8f032-22ad-4db2-952b-1bd9b4780bbb.jpg"
                        },
                            PublicationDate = i < 8 ? DateTime.UtcNow.AddMinutes(-i) : DateTime.UtcNow.AddDays(10 - i),
                            Categories = categoryListId,
                            IsTopPost = i < 3,
                        });
                    }

                    return await SetManyDummyItems(_postRepository, postList);
                }

            }

            return false;
        }

        #region GeneralFunctions
        private async Task<bool> SetDummyItem<T>(IBaseRepository<T> repository, T entity) where T : BaseEntity
        {
            bool success = await repository.RemoveAllAsync();

            if (success)
            {
                T? obj = await repository.InsertAsync(entity);

                success = obj != null;
            }
            return success;
        }


        private async Task<bool> SetManyDummyItems<T>(IBaseRepository<T> repository, IEnumerable<T> entities) where T : BaseEntity
        {
            bool success = await repository.RemoveAllAsync();

            if (success)
            {
                IEnumerable<T> obj = await repository.InsertManyAsync(entities);

                success = entities.Count() == obj.Count();
            }
            return success;
        }
        #endregion GeneralFunctions
    }
}
