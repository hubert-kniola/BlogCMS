using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using GraphQL.Core.Services;

namespace GraphQL.Infrastructure.Services
{
    public class DummyDataService : IDummyDataService
    {
        private ICategoryRepository _categoryRepository;
        private IPostRepository _postRepository;
        private IAboutRepository _aboutRepository;
        private IContactInfoRepository _contactInfoRepository;
        private IContactFormRepository _contactFormRepository;
        private ICarouselRepository _carouselRepository;
        private IFaqReposiotry _faqReposiotry;



        public DummyDataService(
            ICategoryRepository categoryRepository,
            IPostRepository postRepository,
            IAboutRepository aboutRepository,
            IContactInfoRepository contactInfoRepository,
            IContactFormRepository contactFormRepository,
            ICarouselRepository carouselRepository,
            IFaqReposiotry faqReposiotry
            )
        {
            _categoryRepository = categoryRepository;
            _postRepository = postRepository;
            _aboutRepository = aboutRepository;
            _contactInfoRepository = contactInfoRepository;
            _contactFormRepository = contactFormRepository;
            _carouselRepository = carouselRepository;
            _faqReposiotry = faqReposiotry;
        }

        public async Task<bool> Execute()
        {
            bool success;
            //success = await SetDummyAbout();
            //success = await SetDummyContactInfo();
            //success = await SetDummyContactForm();
            //success = await SetDummyCarousels();
            success = await SetDummyFaq();

            return success;
        }

        private async Task<bool> SetDummyAbout()
        {
            bool success = await _aboutRepository.RemoveAllAsync();
            if (success)
            {
                About? about = await _aboutRepository.InsertAsync(new About()
                {
                    Title = "Poznajmy się!",
                    Text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempor eleifend elit vel fermentum. " +
                    "In at lorem commodo sem aliquam ultricies. Curabitur hendrerit aliquet ligula vitae dignissim. Aliquam lobortis " +
                    "molestie metus, nec sagittis elit iaculis sed. Aenean arcu odio, mattis vitae tincidunt eget, placerat sed massa. " +
                    "Nullam luctus nulla sit amet leo bibendum, vitae auctor elit pellentesque. Vestibulum luctus, ipsum congue semper " +
                    "consectetur, velit tellus luctus enim, maximus molestie mauris diam vel odio. Morbi sodales, mi sed eleifend venenatis, " +
                    "lacus felis pharetra ipsum, ac lobortis libero libero in lectus.",
                    ImgName = "07e8f032-22ad-4db2-952b-1bd9b4780bbb.jpg"
                });

                success = about != null;
            }
            return success;
        }

        private async Task<bool> SetDummyContactInfo()
        {
            bool success = await _contactInfoRepository.RemoveAllAsync();

            if (success)
            {
                ContactInfo contact = await _contactInfoRepository.InsertAsync(new ContactInfo()
                {
                    Title = "Chcesz się skontaktować?",
                    Content = "Podziel się Twoimi doświadczeniami! Powiedz co Cię inspiruje. A może chcesz uzyskać wiecej informacji odnośnie jakiegoś postu?",
                    TextBoxes = new List<TextBox>()
                    {
                        new TextBox(){FieldName = "Email", Content= "mail@mail.pl" },
                        new TextBox(){FieldName = "Telefon", Content= "+48 123 456 789" },
                        new TextBox(){FieldName = "Instagram", Content= "www.instagram.com/instagram" },
                    }
                });

                success = contact != null;
            }
            return success;
        }

        private async Task<bool> SetDummyContactForm()
        {
            bool success = await _contactFormRepository.RemoveAllAsync();
            if (success)
            {
                ContactForm contact1 = await _contactFormRepository.InsertAsync(new ContactForm()
                {
                    Name = "Adam Kowalski",
                    Email = "jakis@email.com",
                    Content = "Cześć jestem Adam Kowalski"
                });
                ContactForm contact2 = await _contactFormRepository.InsertAsync(new ContactForm()
                {
                    Name = "Andrzej Nowak",
                    Email = "adam@nowak.com",
                    Content = "Cześć jestem Andrzej Nowak"
                });
                ContactForm contact3 = await _contactFormRepository.InsertAsync(new ContactForm()
                {
                    Name = "Przemek Gość",
                    Email = "przemekgosc@email.com",
                    Content = "Cześć jestem Przemek Gość"
                });

                success = contact1 != null && contact2 != null && contact3 != null;
            }
            return success;
        }

        private async Task<bool> SetDummyCarousels()
        {
            bool success = await _carouselRepository.RemoveAllAsync();
            if (success)
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

                IEnumerable<Carousel> carousels = await _carouselRepository.InsertManyAsync(data);

                success = data.Count == carousels.Count();
            }
            return success;
        }

        private async Task<bool> SetDummyFaq()
        {
            bool success = await _faqReposiotry.RemoveAllAsync();

            if (success)
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

                IEnumerable<Faq> faqs = await _faqReposiotry.InsertManyAsync(data);

                success = data.Count == faqs.Count();
            }
            return success;
        }
    }
}
