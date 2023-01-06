namespace GraphQL.Infrastructure.Common
{
    public static class Helpers
    {
        public static T GetValue<T>(T oldValue, T newValue)
        {
            return newValue != null ? newValue : oldValue;
        }
    }
}
