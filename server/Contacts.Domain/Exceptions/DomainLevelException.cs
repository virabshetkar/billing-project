namespace Contacts.Domain.Exceptions;

public class DomainLevelException : Exception
{
    public DomainLevelException(string message) : base(message)
    {

    }
}
