using Microsoft.EntityFrameworkCore;
using SnappetChallenge.DataAccess.Repositories.Interfaces;
using System.Linq.Expressions;

namespace SnappetChallenge.DataAccess.Repositories
{
  public class Repository<T> : IRepository<T> where T : class
  {
    protected readonly ApplicationDbContext _context;

    public Repository(ApplicationDbContext context)
    {
      _context = context;
    }

    public async Task<T> GetByIdAsync(int id)
    {
      return await _context.Set<T>().FindAsync(id);
    }

    public async Task<IEnumerable<T>> GetAllAsync()
    {
      return await _context.Set<T>().ToListAsync();
    }

    public async Task<int> GetCountAsync(IEnumerable<Expression<Func<T, bool>>>? filters = null)
    {
      IQueryable<T> query = _context.Set<T>();

      if (filters != null)
      {
        foreach (var filter in filters)
        {
          query = query.Where(filter);
        }
      }

      return await query.CountAsync();
    }
    public async Task<List<T>> GetAsync<TKey>(int skip, int take, Expression<Func<T, TKey>>? orderBy = null, IEnumerable<Expression<Func<T, bool>>>? filters = null)
    {
      IQueryable<T> query = _context.Set<T>();

      if (orderBy != null)
      {
        query = query.OrderBy(orderBy);
      }

      if (filters != null)
      {
        foreach (var filter in filters)
        {
          query = query.Where(filter);
        }
      }

      if (skip > 0)
      {
        query = query.Skip(skip);
      }

      if (take > 0)
      {
        query = query.Take(take);
      }

      return await query.ToListAsync();
    }

    public async Task<List<T>> GetAsync<TKey>(Expression<Func<T, TKey>>? orderBy = null, IEnumerable<Expression<Func<T, bool>>>? filters = null)
    {
      IQueryable<T> query = _context.Set<T>();

      if (orderBy != null)
      {
        query = query.OrderBy(orderBy);
      }

      if (filters != null)
      {
        foreach (var filter in filters)
        {
          query = query.Where(filter);
        }
      }

      return await query.ToListAsync();
    }
  }

}
