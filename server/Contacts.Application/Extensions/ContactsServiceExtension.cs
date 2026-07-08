using Contacts.Application.Contracts;
using Microsoft.Extensions.DependencyInjection;

namespace Contacts.Application.Services.Extensions;

public static class ContactsServiceExtension
{
    public static IServiceCollection RegisterContactServices(this IServiceCollection services)
    {
        services.AddScoped<IContactsService, ContactsService>();
        services.AddScoped<IProductsService, ProductsService>();
        services.AddScoped<IBillsService, BillsService>();

        return services;
    }
}
