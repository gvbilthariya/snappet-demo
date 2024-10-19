using Microsoft.AspNetCore.Mvc;
using SnappetChallenge.API.DTOs;
using SnappetChallenge.Business.Services.Interfaces;
using SnappetChallenge.Contracts.Models.Requests;
using SnappetChallenge.Services;
using System.Net;

namespace SnappetChallenge.API.Controllers
{
  [ApiController]
  [Route("api/answers")]
  public class AnswersController : ControllerBase
  {
    private readonly IAnswerService _answerService;

    public AnswersController(IAnswerService answerService)
    {
      _answerService = answerService;
    }

    [HttpGet("search")]
    [ProducesResponseType(typeof(ResourceCollection<AnswerDto>), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> GetAnswersByDateRange([FromQuery] FilterModel filter)
    {
      var answers = await _answerService.GetAnswers(filter);

      return Ok(answers);
    }

    [HttpGet("by-student/{studentId}")]
    [ProducesResponseType(typeof(ResourceCollection<AnswerDto>), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> GetAnswersByStudent(int studentId, [FromQuery] FilterModel filter)
    {
      var answers = await _answerService.GetAnswersByStudent(studentId, filter);

      return Ok(answers);
    }
  }
}
