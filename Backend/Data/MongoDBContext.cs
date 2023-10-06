namespace Backend.Data;

using MongoDB.Driver;

public class MongoDbContext
{
    public IMongoDatabase Database { get; }

    public MongoDbContext(IConfiguration configuration)
    {
        var client = new MongoClient(configuration.GetSection("MongoSettings:Connection").Value);
        Database = client.GetDatabase(configuration.GetSection("MongoSettings:DatabaseName").Value);
    }
}