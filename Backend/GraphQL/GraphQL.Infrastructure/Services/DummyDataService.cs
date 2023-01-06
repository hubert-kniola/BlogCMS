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

        public DummyDataService(
            ICategoryRepository categoryRepository,
            IPostRepository postRepository,
            IAboutRepository aboutRepository,
            IContactInfoRepository contactInfoRepository
)
        {
            _categoryRepository = categoryRepository;
            _postRepository = postRepository;
            _aboutRepository = aboutRepository;
            _contactInfoRepository = contactInfoRepository;

        }

        public async Task<bool> Execute()
        {
            bool success;
            //success = await SetDummyAbout();
            success = await SetDummyContactInfo();

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
    }
}
