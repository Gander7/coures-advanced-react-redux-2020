using System;
using api.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using api.lib;

namespace api.services
{
    public class UserService
    {
        private readonly UserContext _context;
        public UserService(UserContext context)
        {
            _context = context;
        }
        async public Task<User> getUserByUsername(string username)
        {
            return await _context.Users.SingleOrDefaultAsync(u => u.Username == username);
        }

        async public Task<User> CreateUser(string username, string password)
        {
            // Check to make sure that email doesn't exist
            var otherUser = getUserByUsername(username).Result;
            if (otherUser != null) 
                return null;

            // Create User
            var newSalt = Hash.CreateSalt();
            var newUser = new User {
                Username = username,
                Password = Hash.Create(password, newSalt),
                Salt = newSalt
            };

            // Save User
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return newUser;
        }

        public string Authenticate(User user, IConfiguration config)
        {
            var otherUser = getUserByUsername(user.Username).Result;
            if (otherUser == null) 
                return null;
            return Auth.GenerateJSONWebToken(otherUser, config); 
        }
    }
}