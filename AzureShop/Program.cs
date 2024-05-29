using AzureShop.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowMyOrigin",
        builder => builder.WithOrigins("http://localhost:5173") 
                           .AllowAnyHeader()
                           .AllowAnyMethod());
});

builder.Services.AddDbContext<StoreContext>((options) =>
{
    options.UseCosmos(
builder.Configuration.GetValue<string>("CosmosDb:Uri"),
builder.Configuration.GetValue<string>("CosmosDb:Key"),
builder.Configuration.GetValue<string>("CosmosDb:DatabaseName")
);
});

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "AzureShop", Version = "v1" });
});

var app = builder.Build();
app.UseHttpsRedirection();
app.UseStaticFiles();
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseCors("AllowMyOrigin");
app.UseRouting();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    });
}

app.UseAuthorization();

app.MapControllers(); // Ensure you have this call to map your controllers

app.Run();