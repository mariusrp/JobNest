//modell for en bruker
using System;
using System.ComponentModel.DataAnnotations;
using AspNetCore.Identity.Mongo.Model;

namespace LazyNews.Models
{
    public class User : MongoUser
    {
        [Key] public string UserId { get; set; } // Dette feltet kan fylles med GoogleId


        [MaxLength(200)] public string ProfilePictureUrl { get; set; } // Hentes fra Google

        public DateTime RegisteredOn { get; set; } = DateTime.UtcNow; // Registreringstidspunktet
        
    }
}


