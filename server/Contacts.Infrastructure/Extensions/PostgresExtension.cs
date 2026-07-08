using Contacts.Application.Contracts;
using Contacts.Infrastructure.Database;
using Contacts.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Contacts.Infrastructure.Extensions;

public static class PostgresExtension
{
    public static IServiceCollection AddPostgresDb(this IServiceCollection services, string connectionString)
    {
        services.AddDbContext<AppDbContext>(opt => opt.UseNpgsql(connectionString));
        services.AddScoped<IContactsRepository, ContactsRepository>();
        services.AddScoped<IProductsRepository, ProductsRepository>();
        services.AddScoped<IBillsRepository, BillsRepository>();

        return services;
    }
}
