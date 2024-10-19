using SnappetChallenge.DataAccess.Repositories.Interfaces;
using SnappetChallenge.Domain.Entities;

namespace SnappetChallenge.DataAccess.Repositories
{
  public class AnswerRepository : Repository<Answer>, IAnswerRepository
  {
    public AnswerRepository(ApplicationDbContext context) : base(context)
    {
    }
  }
}
