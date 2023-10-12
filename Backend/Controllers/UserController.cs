
// UserController.cs
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Backend.Models;
using MongoDB.Bson.IO;
using Newtonsoft.Json;
using System;
using Microsoft.AspNetCore.Authorization;



namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserRepository _userRepository;
        private readonly FavoritesRepository _favoritesRepository;

        public UserController(UserRepository userRepository , FavoritesRepository favoritesRepository)
        {
            _userRepository = userRepository;
            _favoritesRepository = favoritesRepository; 
        }
        
        [HttpPost("login-or-create-user")]
        public async Task<IActionResult> LoginOrCreateUser([FromBody] User user)
        {
            string userJson = Newtonsoft.Json.JsonConvert.SerializeObject(user);
            Console.WriteLine($"Received user: {userJson}");
            var loggedInUser = await _userRepository.LoginOrCreateUserAsync(user);
            return Ok(new { message = "Login successful.", user = loggedInUser });
        }
        

        [HttpGet("google-response")]
        public async Task<IActionResult> GoogleResponse()
        {
            var info = await _userRepository.GetExternalLoginInfoAsync();
            if (info == null)
            {
                return new JsonResult(new { success = false, message = "Login was cancelled or an error occurred." });
            }

            try
            {
                var user = await _userRepository.HandleGoogleLoginAsync(info);
                if (user == null)
                {
                    return new JsonResult(new { success = false, message = "User already has a local account." });
                }
                return new JsonResult(new { success = true, message = "Login successful.", user });
            }
            catch (Exception ex)
            {
                // Handle error (log it, return an error response, etc.)
                return new JsonResult(new { success = false, message = ex.Message });
            }
        }

        [Authorize]
        [HttpGet("{userId}/favorites")]
        public async Task<IActionResult> GetFavorites(string userId)
        {
            var user = await _userRepository.FindUserByIdAsync(userId);
            if (user == null)
            {
                return NotFound("User not found");
            }

            return Ok(user.FavoriteRssItems);
        }

        [Authorize]
        [HttpPost("{userId}/favorites")]
        public async Task<IActionResult> AddFavorite(string userId, [FromBody] RssItem favoriteItem)
        {
            await _favoritesRepository.AddFavoriteAsync(userId, favoriteItem);  // let FavoritesRepository handle adding favorite
            return Ok(favoriteItem);
        }

        [Authorize]
        [HttpDelete("{userId}/favorites/{rssItemId}")]
        public async Task<IActionResult> RemoveFavorite(string userId, string rssItemId)
        {
            await _favoritesRepository.RemoveFavoriteAsync(userId, rssItemId);  // let FavoritesRepository handle removing favorite
            return Ok();
        }
    }
}




