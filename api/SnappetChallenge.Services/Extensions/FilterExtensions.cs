using SnappetChallenge.Contracts.Models.Requests;
using SnappetChallenge.Domain.Entities;
using System.Linq.Expressions;

namespace SnappetChallenge.Business.Extensions
{
  internal static class FilterExtensions
  {
    public static IEnumerable<Expression<Func<Answer, bool>>> GetAnswerFilterExpression(
           this FilterModel filter)
    {
        yield return a => a.SubmitDateTime >= filter.FromDate && a.SubmitDateTime <= filter.ToDate.AddDays(1);
    }

  }
}
