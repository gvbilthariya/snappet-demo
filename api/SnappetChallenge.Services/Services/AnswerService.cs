using SnappetChallenge.Domain.Entities;
using SnappetChallenge.Contracts.Models.Resources;
using SnappetChallenge.Services;
using SnappetChallenge.DataAccess.Repositories.Interfaces;
using SnappetChallenge.Business.Services.Interfaces;
using AutoMapper;
using System.Linq.Expressions;
using SnappetChallenge.Contracts.Models.Requests;
using SnappetChallenge.Business.Extensions;

namespace SnappetChallenge.Business.Services
{
  public class AnswerService : IAnswerService
  {
    private readonly IRepository<Answer> _answerRepository;
    private readonly IMapper _mapper;
    public AnswerService(IAnswerRepository answerRepository, IMapper mapper)
    {
      _answerRepository = answerRepository;
      _mapper = mapper;
    }

    public async Task<ResourceCollection<AnswerDto>> GetAnswers(FilterModel filter)
    {
      var filterExpession = filter.GetAnswerFilterExpression();

      var answers = await _answerRepository.GetAsync(filter.Skip, filter.Take, a => a.SubmittedAnswerId, filterExpession);
      int totalRecords = await _answerRepository.GetCountAsync(filterExpession);
      var answersDtos = _mapper.Map<List<AnswerDto>>(answers);

      return new ResourceCollection<AnswerDto>(answersDtos, filter.Skip, filter.Take, totalRecords);
    }

    public async Task<ResourceCollection<AnswerDto>> GetAnswersByStudent(int studentId, FilterModel filter)
    {
      var filterExpression = new List<Expression<Func<Answer, bool>>>()
      {
        a => a.UserId == studentId,
      };

      filterExpression.AddRange(filter.GetAnswerFilterExpression());

      var answers = await _answerRepository.GetAsync(filter.Skip, filter.Take, a => a.SubmittedAnswerId, filterExpression);
      int totalRecords = await _answerRepository.GetCountAsync(filterExpression);
      var answersDtos = _mapper.Map<List<AnswerDto>>(answers);

      return new ResourceCollection<AnswerDto>(answersDtos, filter.Skip, filter.Take, totalRecords);
    }
  }
}
