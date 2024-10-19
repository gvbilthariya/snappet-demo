using AutoMapper;
using SnappetChallenge.Contracts.Models.Resources;
using SnappetChallenge.Domain.Entities;

namespace SnappetChallenge.Business.Services.Configurations
{
  public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<Answer, AnswerDto>();
        }
    }
}
