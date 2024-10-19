using Microsoft.EntityFrameworkCore;
using SnappetChallenge.Domain.Entities;
using Newtonsoft.Json;

namespace SnappetChallenge.DataAccess
{
  public class ApplicationDbContext  : DbContext
  {
    public ApplicationDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Answer> Answers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Answer>().HasKey(k => k.SubmittedAnswerId);
      base.OnModelCreating(modelBuilder);

      var answers = LoadAnswersFromFile();
      if (answers != null)
      {
        modelBuilder.Entity<Answer>().HasData(answers);
      }
    }

    private static List<Answer> LoadAnswersFromFile()
    {
      try
      {
        var filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "data.json");

        if (File.Exists(filePath))
        {
          var jsonData = File.ReadAllText(filePath);
          return JsonConvert.DeserializeObject<List<Answer>>(jsonData);
        }
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error loading data from file: {ex.Message}");
      }
      return new List<Answer>();
    }
  }
}
