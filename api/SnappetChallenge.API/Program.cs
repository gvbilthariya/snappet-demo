using SnappetChallenge.DataAccess;
using SnappetChallenge.DataAccess.Extentions;
using SnappetChallenge.Business.Services;
using SnappetChallenge.DataAccess.Repositories.Interfaces;
using SnappetChallenge.DataAccess.Repositories;
using SnappetChallenge.Business.Services.Interfaces;
using SnappetChallenge.Business.Services.Configurations;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(AutoMapperConfig));
builder.Services.AddDataAccess("AppDb");

// Register the Services
builder.Services.AddScoped<IAnswerService, AnswerService>();
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IAnswerRepository, AnswerRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(configurePolicy =>
{
    configurePolicy.AllowAnyOrigin();
    configurePolicy.AllowAnyMethod();
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

SeedDatabase(app);

app.Run();


void SeedDatabase(IApplicationBuilder app)
{
  using (var serviceScope = app.ApplicationServices.CreateScope())
  {
    var context = serviceScope.ServiceProvider.GetRequiredService<ApplicationDbContext >();
    context.Database.EnsureCreated();
  }
}
