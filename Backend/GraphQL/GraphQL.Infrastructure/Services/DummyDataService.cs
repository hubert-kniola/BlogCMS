using GraphQL.Core.Entities;
using GraphQL.Core.Repository;
using GraphQL.Core.Services;
using System.Diagnostics.Contracts;

namespace GraphQL.Infrastructure.Services
{
    public class DummyDataService : IDummyDataService
    {
        private ICategoryRepository _categoryRepository;
        private IPostRepository _postRepository;
        private IAboutRepository _aboutRepository;
        private IContactInfoRepository _contactInfoRepository;
        private IContactFormRepository _contactFormRepository;


        public DummyDataService(
            ICategoryRepository categoryRepository,
            IPostRepository postRepository,
            IAboutRepository aboutRepository,
            IContactInfoRepository contactInfoRepository,
            IContactFormRepository contactFormRepository
            )
        {
            _categoryRepository = categoryRepository;
            _postRepository = postRepository;
            _aboutRepository = aboutRepository;
            _contactInfoRepository = contactInfoRepository;
            _contactFormRepository = contactFormRepository;
        }

        public async Task<bool> Execute()
        {
            bool success;
            //success = await SetDummyAbout();
            //success = await SetDummyContactInfo();
            success = await SetDummyContactForm();

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
    }
}
