using SnappetChallenge.Contracts.Models.Requests;
using SnappetChallenge.Contracts.Models.Resources;
using SnappetChallenge.Services;

namespace SnappetChallenge.Business.Services.Interfaces
{
  public interface IAnswerService
  {
    public Task<ResourceCollection<AnswerDto>> GetAnswers(FilterModel filter);
    public Task<ResourceCollection<AnswerDto>> GetAnswersByStudent(int studentId, FilterModel filter);
  }
}
