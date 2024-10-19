
namespace SnappetChallenge.Contracts.Models.Requests
{
  public class FilterModel
  {
    public DateTime FromDate { get; set; }
    public DateTime ToDate { get; set; }
    public int Skip { get; set; } = 0;
    public int Take { get; set; } = 1000;
}
  }
