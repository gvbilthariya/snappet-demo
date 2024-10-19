namespace SnappetChallenge.Services
{
  public class ResourceCollection<T>
  {
    public IEnumerable<T> Items { get; set; }
    public int? Skip { get; set; }
    public int? Take { get; set; }
    public long TotalRecords { get; set; }

    public ResourceCollection()
    {
      Items = Enumerable.Empty<T>();
    }

    public ResourceCollection(IEnumerable<T> items)
    {
      Items = items;
    }

    public ResourceCollection(IEnumerable<T> items, int? skip, int? take, long totalRecords)
    {
      Items = items;
      Skip = skip;
      Take = take;
      TotalRecords = totalRecords;

    }
  }
}
