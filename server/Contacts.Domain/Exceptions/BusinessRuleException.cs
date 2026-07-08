namespace Contacts.Domain.Exceptions;

public class BusinessRuleException : DomainLevelException
{
    public BusinessRuleException(string message) : base(message)
    {

    }
}
