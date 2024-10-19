using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace SnappetChallenge.DataAccess.Extentions
{
  public static class DataAccessServiceCollectionExtensions
  {
    public static IServiceCollection AddDataAccess(this IServiceCollection services, string dbName)
    {
      services.AddDbContext<ApplicationDbContext >(
          options =>
          {
            options.UseInMemoryDatabase(dbName);
          });
      return services;
    }
  }
}
