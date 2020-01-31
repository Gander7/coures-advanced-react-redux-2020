using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using api.Models;
using api.lib;
using api.services;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserContext _context;
        private IConfiguration _config;

        public AuthenticationController(UserContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpGet("login")]
        public async Task<ActionResult> Login(User paramUser) {

            // Check to make sure that email exists
            UserService us = new UserService(_context);
            var tokenStr = us.Authenticate(paramUser, _config);

            // Can't process if username is not found
            if (string.IsNullOrEmpty(tokenStr))
                return JsonRes.Create(422, new { message = "username not found." });
           
            // Return token
            return JsonRes.Create(200, new { token = tokenStr });
        }


        // GET: api/Authentication
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Authentication/5
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return NotFound();

            return user;
        }

        // POST: api/Authentication
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult> PostUser([FromBody] User user)
        {
            // TODO: Check Username and Password for patterns
            if (string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.Password))
                return JsonRes.Create(422, new { message = "username and password required." });

            UserService us = new UserService(_context);
            var newUser = us.CreateUser(user.Username, user.Password).Result;

            if (newUser == null)
                return JsonRes.Create(422, new { message = "username already exists." });

            // Return Success
            return JsonRes.Create(201, new { username = newUser.Username });
        }

        // DELETE: api/Authentication/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
