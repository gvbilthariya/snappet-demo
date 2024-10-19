

using System.Linq.Expressions;

namespace SnappetChallenge.DataAccess.Repositories.Interfaces
{
  public interface IRepository<T> where T : class
  {
    Task<T> GetByIdAsync(int id);
    Task<IEnumerable<T>> GetAllAsync();
    Task<int> GetCountAsync(IEnumerable<Expression<Func<T, bool>>>? filter = null);
    Task<List<T>> GetAsync<TKey>(int skip, int take, Expression<Func<T, TKey>>? orderBy = null, IEnumerable<Expression<Func<T, bool>>>? filter = null);
    Task<List<T>> GetAsync<TKey>(Expression<Func<T, TKey>>? orderBy = null, IEnumerable<Expression<Func<T, bool>>>? filter = null);
  }
}
